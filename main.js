// Make an indirect representation of the examination timetabling problem from the slides. Implement the following two functions:
// - Generate a feasible solution (as described in slides from 8 to 15) based on indirect encoding, and
// - Mutate an indirect encoded timetable (as described in slides 16 and 17)

// PARAMETERS
const numberOfExams = 8;
const exams = Array.from({length: numberOfExams}, (_, i) => i + 1)
const numberOfSlots = 16;
const examsWithSameStudents = [[1, 2], [4, 5, 8], [6, 4, 1]];
const sameStudentsExam = {};
examsWithSameStudents.forEach((exams) => {
    exams.forEach((exam) => sameStudentsExam[exam] = exams);
});

let encoding = [4, 5, 13, 1, 1, 4, 13, 2];

// FUNCTIONS
const newEncoding = () => {
    return Array.from({length: numberOfExams}, () => Math.floor(Math.random() * numberOfSlots));
};

const mutateEncoding = (encoding) => {
    const _encoding = [...encoding];
    const newValue = Math.floor(Math.random() * numberOfSlots);
    const position = Math.floor(Math.random() * numberOfExams);
    _encoding[position] = newValue;
    return _encoding;
};

const newSolution = (encoding) => {
    encoding.map((assignment) => {
      return assignment;
    });
};

encoding = newEncoding();

console.log(encoding, mutateEncoding(encoding), mutateEncoding(encoding), mutateEncoding(encoding));
