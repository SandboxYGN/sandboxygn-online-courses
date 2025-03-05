import mysql from 'mysql2/promise';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

// Replace the secret name with your Secrets Manager secret ARN
const secret_name = "test/ayintachainbawa/mysql";

const client = new SecretsManagerClient({
  region: "ap-south-1",  // Ensure this is the region your secret is in
});

// Fetching the secret from AWS Secrets Manager
async function getSecret() {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // Default version stage
      })
    );

    const secret = JSON.parse(response.SecretString);
    return secret;  // The secret is typically a JSON with database credentials
  } catch (error) {
    console.error("Error fetching secret:", error);
    throw error;
  }
}

// Main function to connect to the database
async function connectToDatabase() {
  try {
    // Fetch credentials from Secrets Manager
    const secret = await getSecret();

    // Extract credentials from the secret
    const { username, password, host, dbClusterIdentifier, port, engine } = secret;

    // Make sure all required parameters are available
    if (!username || !password || !host || !dbClusterIdentifier) {
      throw new Error("Missing required database credentials.");
    }

    // Create a MySQL connection pool using credentials from Secrets Manager
    const pool = mysql.createPool({
      host: host, // e.g., 'database-1-instance-1.cje8ccsoinyb.ap-south-1.rds.amazonaws.com'
      user: username, // e.g., 'admin'
      password: password, // The password obtained from Secrets Manager
      database: "testing", // You might want to use the dbClusterIdentifier or another field for the database name
      port: port || 3306, // Default MySQL port is 3306, but use the one in your secret if defined
    });

    console.log("Connected to the database successfully!");

    // You can now query the database, for example:
    const [rows] = await pool.execute("SELECT NOW() AS now");
    console.log(rows);

    // Don't forget to close the pool after you're done
    await pool.end();

  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

// Call the function to connect
connectToDatabase();
