// ============================================
// CONSUMIDOR DE APIs - Microevaluacion3
// ============================================

class DefenseApiConsumer {
    constructor(baseUrl = '/api') {
        this.baseUrl = baseUrl;
    }

    // ========== MÉTODOS COMUNES ==========
    async _makeRequest(endpoint, options = {}) {
        try {
            const response = await fetch(endpoint, options);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `HTTP error! status: ${response.status}`);
            }
            
            // Si la respuesta es 204 No Content, retornar null
            if (response.status === 204) {
                return null;
            }
            
            return await response.json();
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    // ========== DEFENSAS ==========
    async getAllDefenses() {
        return this._makeRequest(`${this.baseUrl}/DefensesApi`);
    }

    async getDefense(id) {
        return this._makeRequest(`${this.baseUrl}/DefensesApi/${id}`);
    }

    async createDefense(defenseData) {
        return this._makeRequest(`${this.baseUrl}/DefensesApi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(defenseData)
        });
    }

    async updateDefense(id, defenseData) {
        return this._makeRequest(`${this.baseUrl}/DefensesApi/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(defenseData)
        });
    }

    async deleteDefense(id) {
        return this._makeRequest(`${this.baseUrl}/DefensesApi/${id}`, {
            method: 'DELETE'
        });
    }

    // Métodos especiales para Defensas
    async getTodayDefenses() {
        return this._makeRequest(`${this.baseUrl}/DefensesApi/today`);
    }

    async getDefensesByCareer(career) {
        return this._makeRequest(`${this.baseUrl}/DefensesApi/career/${encodeURIComponent(career)}`);
    }

    async getDefensesByStudent(studentId) {
        return this._makeRequest(`${this.baseUrl}/DefensesApi/student/${studentId}`);
    }

    async getDefensesByStatus(status) {
        return this._makeRequest(`${this.baseUrl}/DefensesApi/status/${encodeURIComponent(status)}`);
    }

    // ========== ESTUDIANTES ==========
    async getAllStudents() {
        return this._makeRequest(`${this.baseUrl}/StudentsApi`);
    }

    async getStudent(id) {
        return this._makeRequest(`${this.baseUrl}/StudentsApi/${id}`);
    }

    async getStudentByCode(code) {
        return this._makeRequest(`${this.baseUrl}/StudentsApi/code/${encodeURIComponent(code)}`);
    }

    async createStudent(studentData) {
        return this._makeRequest(`${this.baseUrl}/StudentsApi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData)
        });
    }

    async updateStudent(id, studentData) {
        return this._makeRequest(`${this.baseUrl}/StudentsApi/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData)
        });
    }

    async deleteStudent(id) {
        return this._makeRequest(`${this.baseUrl}/StudentsApi/${id}`, {
            method: 'DELETE'
        });
    }

    // Métodos especiales para Estudiantes
    async getActiveStudents() {
        return this._makeRequest(`${this.baseUrl}/StudentsApi/active`);
    }

    async getStudentsByCareer(career) {
        return this._makeRequest(`${this.baseUrl}/StudentsApi/career/${encodeURIComponent(career)}`);
    }

    async searchStudents(searchParams = {}) {
        const params = new URLSearchParams();
        
        if (searchParams.name) params.append('name', searchParams.name);
        if (searchParams.career) params.append('career', searchParams.career);
        if (searchParams.active !== undefined) params.append('active', searchParams.active);
        
        return this._makeRequest(`${this.baseUrl}/StudentsApi/search?${params.toString()}`);
    }

    async getStudentDefenses(studentId) {
        return this._makeRequest(`${this.baseUrl}/StudentsApi/${studentId}/defenses`);
    }

    async getStudentsStats() {
        return this._makeRequest(`${this.baseUrl}/StudentsApi/stats`);
    }

    async activateStudent(id) {
        return this._makeRequest(`${this.baseUrl}/StudentsApi/${id}/activate`, {
            method: 'PATCH'
        });
    }

    async deactivateStudent(id) {
        return this._makeRequest(`${this.baseUrl}/StudentsApi/${id}/deactivate`, {
            method: 'PATCH'
        });
    }

    // ========== EVALUADORES ==========
    async getAllEvaluators() {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi`);
    }

    async getEvaluator(id) {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/${id}`);
    }

    async getEvaluatorByCode(code) {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/code/${encodeURIComponent(code)}`);
    }

    async createEvaluator(evaluatorData) {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(evaluatorData)
        });
    }

    async updateEvaluator(id, evaluatorData) {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(evaluatorData)
        });
    }

    async deleteEvaluator(id) {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/${id}`, {
            method: 'DELETE'
        });
    }

    // Métodos especiales para Evaluadores
    async getActiveEvaluators() {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/active`);
    }

    async getEvaluatorsByType(type) {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/type/${encodeURIComponent(type)}`);
    }

    async getEvaluatorsByDepartment(department) {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/department/${encodeURIComponent(department)}`);
    }

    async searchEvaluators(searchParams = {}) {
        const params = new URLSearchParams();
        
        if (searchParams.name) params.append('name', searchParams.name);
        if (searchParams.type) params.append('type', searchParams.type);
        if (searchParams.department) params.append('department', searchParams.department);
        if (searchParams.active !== undefined) params.append('active', searchParams.active);
        
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/search?${params.toString()}`);
    }

    async getEvaluatorsStats() {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/stats`);
    }

    async activateEvaluator(id) {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/${id}/activate`, {
            method: 'PATCH'
        });
    }

    async deactivateEvaluator(id) {
        return this._makeRequest(`${this.baseUrl}/EvaluatorsApi/${id}/deactivate`, {
            method: 'PATCH'
        });
    }

    // ========== MÉTODOS ÚTILES ==========
    
    // Obtener todas las carreras disponibles
    async getAllCareers() {
        const defenses = await this.getAllDefenses();
        const students = await this.getAllStudents();
        
        const careersFromDefenses = [...new Set(defenses.map(d => d.career))];
        const careersFromStudents = [...new Set(students.map(s => s.career))];
        
        return [...new Set([...careersFromDefenses, ...careersFromStudents])].sort();
    }

    // Obtener estadísticas generales del sistema
    async getSystemStats() {
        const [defenses, students, evaluators] = await Promise.all([
            this.getAllDefenses(),
            this.getAllStudents(),
            this.getAllEvaluators()
        ]);

        const today = new Date().toISOString().split('T')[0];
        const todayDefenses = defenses.filter(d => 
            d.defenseDate && d.defenseDate.startsWith(today)
        );

        return {
            totalDefenses: defenses.length,
            totalStudents: students.length,
            totalEvaluators: evaluators.length,
            todayDefenses: todayDefenses.length,
            completedDefenses: defenses.filter(d => d.status === 'Completed').length,
            activeStudents: students.filter(s => s.isActive).length,
            activeEvaluators: evaluators.filter(e => e.isActive).length
        };
    }

    // Cargar datos de ejemplo (para desarrollo)
    async loadSampleData() {
        try {
            // Datos de ejemplo para estudiantes
            const sampleStudents = [
                {
                    code: 'CS2023001',
                    firstName: 'Juan',
                    lastName: 'Perez',
                    email: 'juan.perez@university.edu',
                    career: 'Computer Science',
                    semester: 10,
                    isActive: true
                },
                {
                    code: 'SE2023001',
                    firstName: 'Maria',
                    lastName: 'Gonzalez',
                    email: 'maria.gonzalez@university.edu',
                    career: 'Software Engineering',
                    semester: 9,
                    isActive: true
                }
            ];

            // Datos de ejemplo para evaluadores
            const sampleEvaluators = [
                {
                    code: 'PROF001',
                    firstName: 'Dr. Robert',
                    lastName: 'Smith',
                    title: 'PhD',
                    type: 'Internal',
                    department: 'Computer Science Department',
                    isActive: true
                },
                {
                    code: 'EXT001',
                    firstName: 'Ing. Luis',
                    lastName: 'Martinez',
                    title: 'Engineer',
                    type: 'External',
                    department: 'Google LLC',
                    isActive: true
                }
            ];

            // Crear estudiantes
            const createdStudents = [];
            for (const student of sampleStudents) {
                try {
                    const created = await this.createStudent(student);
                    createdStudents.push(created);
                } catch (error) {
                    console.log('Estudiante ya existe o error:', student.code);
                }
            }

            // Crear evaluadores
            const createdEvaluators = [];
            for (const evaluator of sampleEvaluators) {
                try {
                    const created = await this.createEvaluator(evaluator);
                    createdEvaluators.push(created);
                } catch (error) {
                    console.log('Evaluador ya existe o error:', evaluator.code);
                }
            }

            // Crear defensas si hay estudiantes creados
            if (createdStudents.length > 0) {
                const sampleDefenses = [
                    {
                        title: 'Intelligent Chatbot Development using Deep Learning',
                        description: 'Design and implementation of a conversational AI system',
                        career: 'Computer Science',
                        defenseType: 'Thesis',
                        status: 'Scheduled',
                        defenseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        startTime: '09:00:00',
                        endTime: '11:00:00',
                        location: 'Engineering Building',
                        classroom: 'Room 301',
                        studentId: createdStudents[0].id
                    },
                    {
                        title: 'Web Development System for University Management',
                        description: 'Full-stack web application for managing university resources',
                        career: 'Software Engineering',
                        defenseType: 'Project',
                        status: 'In Progress',
                        defenseDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        startTime: '14:00:00',
                        endTime: '16:00:00',
                        location: 'Technology Center',
                        classroom: 'Room 102',
                        studentId: createdStudents.length > 1 ? createdStudents[1].id : createdStudents[0].id
                    }
                ];

                for (const defense of sampleDefenses) {
                    try {
                        await this.createDefense(defense);
                    } catch (error) {
                        console.log('Error creando defensa:', error.message);
                    }
                }
            }

            return {
                message: 'Datos de ejemplo cargados exitosamente',
                studentsCreated: createdStudents.length,
                evaluatorsCreated: createdEvaluators.length
            };

        } catch (error) {
            console.error('Error cargando datos de ejemplo:', error);
            throw error;
        }
    }

    // Exportar datos a JSON
    async exportData(format = 'json') {
        try {
            const [defenses, students, evaluators] = await Promise.all([
                this.getAllDefenses(),
                this.getAllStudents(),
                this.getAllEvaluators()
            ]);

            const data = {
                exportedAt: new Date().toISOString(),
                defenses,
                students,
                evaluators
            };

            if (format === 'json') {
                return data;
            } else if (format === 'blob') {
                const blob = new Blob([JSON.stringify(data, null, 2)], { 
                    type: 'application/json' 
                });
                return blob;
            } else if (format === 'download') {
                const blob = await this.exportData('blob');
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `microevaluacion3-backup-${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                return { message: 'Descarga iniciada' };
            }

            return data;
        } catch (error) {
            console.error('Error exportando datos:', error);
            throw error;
        }
    }

    // Importar datos desde JSON
    async importData(jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            const results = {
                importedAt: new Date().toISOString(),
                students: { success: 0, errors: [] },
                evaluators: { success: 0, errors: [] },
                defenses: { success: 0, errors: [] }
            };

            // Importar estudiantes
            if (data.students && Array.isArray(data.students)) {
                for (const student of data.students) {
                    try {
                        await this.createStudent(student);
                        results.students.success++;
                    } catch (error) {
                        results.students.errors.push({
                            code: student.code,
                            error: error.message
                        });
                    }
                }
            }

            // Importar evaluadores
            if (data.evaluators && Array.isArray(data.evaluators)) {
                for (const evaluator of data.evaluators) {
                    try {
                        await this.createEvaluator(evaluator);
                        results.evaluators.success++;
                    } catch (error) {
                        results.evaluators.errors.push({
                            code: evaluator.code,
                            error: error.message
                        });
                    }
                }
            }

            // Importar defensas
            if (data.defenses && Array.isArray(data.defenses)) {
                for (const defense of data.defenses) {
                    try {
                        await this.createDefense(defense);
                        results.defenses.success++;
                    } catch (error) {
                        results.defenses.errors.push({
                            title: defense.title,
                            error: error.message
                        });
                    }
                }
            }

            return results;
        } catch (error) {
            console.error('Error importando datos:', error);
            throw error;
        }
    }
}

// ============================================
// EJEMPLOS DE USO
// ============================================

/*
// 1. Crear instancia
const api = new DefenseApiConsumer();

// 2. Obtener todas las defensas
api.getAllDefenses()
    .then(defenses => console.log('Defensas:', defenses))
    .catch(error => console.error('Error:', error));

// 3. Crear un nuevo estudiante
api.createStudent({
    code: 'TEST001',
    firstName: 'Test',
    lastName: 'Student',
    email: 'test@email.com',
    career: 'Computer Science',
    semester: 8,
    isActive: true
})
    .then(student => console.log('Estudiante creado:', student))
    .catch(error => console.error('Error:', error));

// 4. Buscar estudiantes por nombre
api.searchStudents({ name: 'juan', active: true })
    .then(students => console.log('Resultados:', students))
    .catch(error => console.error('Error:', error));

// 5. Obtener estadísticas del sistema
api.getSystemStats()
    .then(stats => console.log('Estadísticas:', stats))
    .catch(error => console.error('Error:', error));

// 6. Cargar datos de ejemplo (solo desarrollo)
api.loadSampleData()
    .then(result => console.log('Datos cargados:', result))
    .catch(error => console.error('Error:', error));

// 7. Exportar datos
api.exportData('download')
    .then(() => console.log('Datos exportados'))
    .catch(error => console.error('Error:', error));
*/

// ============================================
// HELPER FUNCTIONS
// ============================================

// Formatear fecha para mostrar
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Formatear hora
function formatTime(timeString) {
    if (!timeString) return 'N/A';
    return timeString.substring(0, 5); // HH:MM
}

// Crear badge para estado
function createStatusBadge(status) {
    const badges = {
        'Scheduled': 'primary',
        'In Progress': 'warning',
        'Completed': 'success',
        'Postponed': 'secondary',
        'Cancelled': 'danger'
    };

    const color = badges[status] || 'info';
    return `<span class="badge bg-${color}">${status}</span>`;
}

// Crear elemento de lista para API
function createApiListItem(title, endpoint, methods = 'GET') {
    return `
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${title}</h6>
                <small class="text-muted">${methods}</small>
            </div>
            <p class="mb-1 text-muted small">${endpoint}</p>
        </div>
    `;
}

// ============================================
// EXPORTAR PARA USO GLOBAL
// ============================================

// Exportar la clase principal
window.DefenseApi = new DefenseApiConsumer();

// Exportar funciones helper
window.apiHelpers = {
    formatDate,
    formatTime,
    createStatusBadge,
    createApiListItem
};

// Mensaje de inicialización
console.log('✅ DefenseApiConsumer cargado correctamente');
console.log('📚 Documentación disponible en /api/docs');
console.log('🚀 Usa: DefenseApi.getAllDefenses().then(data => console.log(data))');