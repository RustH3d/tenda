module.exports = {
    getModuleInfo: "SELECT * FROM modules WHERE id = ?",
    createModule: "INSERT INTO modules (name, description) VALUES (?, ?)",
    updateModule: "UPDATE modules SET name = ?, description = ? WHERE id = ?",
    deleteModule: "DELETE FROM modules WHERE id = ?"
};
