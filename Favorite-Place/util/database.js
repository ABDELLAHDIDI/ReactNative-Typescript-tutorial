import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

let database = null;

export async function init() {
  try {
    // open (or create) the database using the async API
    database = await SQLite.openDatabaseAsync("places.db");

    // execute SQL with try/catch handling
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );
    `);

    return {
      success: true,
      message: "Database initialized successfully.",
    };
  } catch (error) {
    console.error("Database initialization error:", error);
    return {
      success: false,
      message: "Failed to initialize database.",
      error: error?.message || error,
    };
  }
}

export async function insertPlace(place) {
    if (!database) {
      return {
        success: false,
        message: "Database is not initialized.",
        error: "No database connection",
      };
    }
  
    try {
      const result = await database.runAsync(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ]
      );
      console.log("lastInsertId :", result.lastInsertRowId);
      return {
        success: true,
        message: "Place inserted successfully.",
        lastInsertId: result.lastInsertRowId,  // runAsync returns this per docs :contentReference[oaicite:1]{index=1}
        changes: result.changes,
      };
    } catch (error) {
      console.error("Insert place error:", error);
      return {
        success: false,
        message: "Failed to insert place.",
        error: error?.message || error,
      };
    }
  }

export async function fetchPlaces() {
  if (!database) {
    await init();
  }

  try {
    const places = await database.getAllAsync("SELECT * FROM places");

    return places.map(
      (place) =>
        new Place(
          place.title,
          place.imageUri,
          {
            address: place.address,
            lat: place.lat,
            lng: place.lng,
          },
          place.id
        )
    );
  } catch (error) {
    console.error("Fetch places error:", error);
    throw error;
  }
}
  