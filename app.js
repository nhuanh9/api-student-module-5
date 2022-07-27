const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const students = [
    {
        id: 1,
        title: 'Vũ Đình Sơn',
        description: 'Xây thành phố, làm bài thi không đạt',
        action: 'Xem xét'
    },   {
        id: 2,
        title: 'Đoàn Thị Hường',
        description: 'Nghỉ nhiều, làm bài thi không đạt',
        action: 'Xem xét'
    },    {
        id: 3,
        title: 'Vũ Thanh Tùng',
        description: 'Thường xuyên ốm, nghỉ không báo cho lớp',
        action: 'Xem xét'
    },
];

app.get("/students", (req, res, next) => {
    res.json(students);
});
app.get("/students/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findStudentIndex(id);
    if(index !== -1) {
        res.json(students[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
app.post("/students", (req, res, next) => {
    const student = {
        id: (new Date()).getTime(),
        title: req.body.title,
        description: req.body.description,
        action: req.body.action
    };
    students.push(student);
    res.json(student);
});
app.delete("/students/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findStudentIndex(id);
    if(index !== -1) {
        students.splice(index, 1);
        res.json({message: 'Student deleted', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

app.put("/students/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findStudentIndex(id);
    if(index !== -1) {
        const student = students[index];
        student.title = req.body.title;
        student.action = req.body.action;
        student.description = req.body.description;
        res.json(student);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

function findStudentIndex(id) {
    for(let i = 0; i < students.length; i++) {
        if(students[i].id === id) {
            return i;
        }
    }
    return -1;
}
