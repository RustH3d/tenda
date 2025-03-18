const querys = require('./module_queries');

class ModuleService {
    
    // Obtener información de un módulo por ID
    async getModuleInfo(moduleId) {
        try {
            const query = querys.module.getModuleInfo;
            const [data] = await pool.query(query, [moduleId]);
            return data;
        } catch (error) {
            console.error('Error obteniendo información del módulo:', error);
            throw error;
        }
    }

    // Crear un nuevo módulo
    async createModule(moduleData) {
        try {
            const query = querys.module.createModule;
            const { name, description } = moduleData;
            const [result] = await pool.query(query, [name, description]);
            return result.insertId; // Devuelve el ID del nuevo módulo
        } catch (error) {
            console.error('Error creando el módulo:', error);
            throw error;
        }
    }

    // Actualizar un módulo existente
    async updateModule(moduleId, moduleData) {
        try {
            const query = querys.module.updateModule;
            const { name, description } = moduleData;
            const [result] = await pool.query(query, [name, description, moduleId]);
            return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
        } catch (error) {
            console.error('Error actualizando el módulo:', error);
            throw error;
        }
    }

    // Eliminar un módulo por ID
    async deleteModule(moduleId) {
        try {
            const query = querys.module.deleteModule;
            const [result] = await pool.query(query, [moduleId]);
            return result.affectedRows > 0; 
        } catch (error) {
            console.error('Error eliminando el módulo:', error);
            throw error;
        }
    }
}

module.exports = ModuleService;
