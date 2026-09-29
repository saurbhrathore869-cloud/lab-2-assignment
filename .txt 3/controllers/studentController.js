let students = [
    {
        id: 1,
        name: "Sourav",
        age: 20,
        course: "B.Tech CSE"
    },
    {
        id: 2,
        name: "Rahul",
        age: 21,
        course: "BCA"
    },
    {
        id: 3,
        name: "Aman",
        age: 20,
        course: "B.Tech IT"
    }
];


// ==========================================
// GET ALL STUDENTS
// GET /students
// ==========================================

const getStudents = (req, res) => {
    try {

        res.status(200).json({
            success: true,
            count: students.length,
            students: students
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to get students",
            error: error.message
        });

    }
};


// ==========================================
// GET STUDENT BY ID
// GET /students/:id
// ==========================================

const getStudentById = (req, res) => {
    try {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const student = students.find(
            student => student.id === id
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            student: student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to get student",
            error: error.message
        });

    }
};


// ==========================================
// CREATE STUDENT
// POST /students
// ==========================================

const createStudent = (req, res) => {
    try {

        const { name, age, course } = req.body;

        if (!name || !age || !course) {
            return res.status(400).json({
                success: false,
                message: "Name, age and course are required"
            });
        }

        if (typeof age !== "number" || age <= 0) {
            return res.status(400).json({
                success: false,
                message: "Age must be a valid positive number"
            });
        }

        const newId =
            students.length > 0
                ? Math.max(...students.map(s => s.id)) + 1
                : 1;

        const newStudent = {
            id: newId,
            name: name,
            age: age,
            course: course
        };

        students.push(newStudent);

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student: newStudent
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to create student",
            error: error.message
        });

    }
};


// ==========================================
// UPDATE STUDENT
// PUT /students/:id
// ==========================================

const updateStudent = (req, res) => {
    try {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const student = students.find(
            student => student.id === id
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const { name, age, course } = req.body;

        if (
            name === undefined &&
            age === undefined &&
            course === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one field to update"
            });
        }

        if (name !== undefined) {
            student.name = name;
        }

        if (age !== undefined) {

            if (typeof age !== "number" || age <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Age must be a valid positive number"
                });
            }

            student.age = age;
        }

        if (course !== undefined) {
            student.course = course;
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student: student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to update student",
            error: error.message
        });

    }
};


// ==========================================
// DELETE STUDENT
// DELETE /students/:id
// ==========================================

const deleteStudent = (req, res) => {
    try {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const index = students.findIndex(
            student => student.id === id
        );

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const deletedStudent = students.splice(index, 1)[0];

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            student: deletedStudent
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete student",
            error: error.message
        });

    }
};


module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
