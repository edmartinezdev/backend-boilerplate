db = db.getSiblingDB("issues"); // Switch to the "issues" database

db.createUser({
  user: "issuesUser", // Username
  pwd: "securePassword123", // Password
  roles: [{ role: "readWrite", db: "issues" }], // Permissions for the "issues" database
});

print(
  "MongoDB: User 'issuesUser' created with 'readWrite' role on 'issues' database."
);
