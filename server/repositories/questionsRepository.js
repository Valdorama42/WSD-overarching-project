import postgres from "postgres";

const sql = postgres();

const getQuestionsForCourse = async (courseId) => {
    await sql`
        SELECT id, title, text, upvotes, course_id
        FROM questions
        WHERE course_id = ${courseId}
        ORDER BY id
    `;
};

const createQuestion = async (courseId, title, text) => {
    const question = await sql`
        INSERT INTO questions (title, text, course_id)
        VALUES (${title}, ${text}, ${courseId})
        RETURNING id, title, text, upvotes, course_id
    `;
    return question[0];
};

const upvoteQuestion = async (courseID, questionId) => {
    const question = await sql`
        UPDATE questions
        SET upvotes = upvotes + 1
        WHERE course_id = ${courseID} AND id = ${questionId}
        RETURNING id, title, text, upvotes, course_id
    `;
    return question[0];
};

const deleteQuestion = async (courseId, questionId) => {
    const question = await sql`
        DELETE FROM questions
        WHERE course_id = ${courseId} AND id = ${questionId}
        RETURNING id, title, text, upvotes, course_id
    `;
    return question[0];
};

export { 
    getQuestionsForCourse, 
    createQuestion, 
    upvoteQuestion, 
    deleteQuestion 
};