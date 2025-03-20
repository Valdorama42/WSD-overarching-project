import postgres from "postgres";

const sql = postgres();

const getAllCourses = async () => {
    return await sql`
        SELECT id, name
        FROM courses
        ORDER BY id
    `;
};

const getCourseById = async (id) => {
    const course = await sql`
        SELECT id, name
        FROM courses
        WHERE id = ${id}
    `;
    return course[0];
};

const createCourse = async (name) => {
    const course = await sql`
        INSERT INTO courses (name)
        VALUES (${name})
        RETURNING id, name
    `;
    return course[0];
};

const deleteCourse = async (id) => {
    const course = await sql`
        DELETE FROM courses
        WHERE id = ${id}
        RETURNING id, name
    `;
    return course[0];
};

export {
    getAllCourses,
    getCourseById,
    createCourse,
    deleteCourse
};