// Make an indirect representation of the examination timetabling problem from the slides. Implement the following two functions:
// - Generate a feasible solution (as described in slides from 8 to 15) based on indirect encoding, and
// - Mutate an indirect encoded timetable (as described in slides 16 and 17)

// PARAMETERS
const numberOfExams = 8;
const exams = Array.from({length: numberOfExams}, (_, i) => i + 1)
const numberOfSlots = 16;
const slotsPerDay = 4;
const sameStudentsExam = {};
let encoding = [4, 5, 13, 1, 1, 4, 13, 2];

// CLASHES
const examsWithSameStudents = [[1, 2], [4, 5, 8], [6, 4, 1]];
examsWithSameStudents.forEach((exams) => {
    exams.forEach((exam) => {
        if (typeof sameStudentsExam[exam] !== 'object')
            sameStudentsExam[exam] = exams;
        else
            sameStudentsExam[exam] = [...new Set([...sameStudentsExam[exam], ...exams])];
    });
});

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

const noClasesh = (exam, scheduledExams) => {
    const clashes = sameStudentsExam[exam];
    if (!clashes) return true;

    const assignments = scheduledExams.flatMap((sched) => sameStudentsExam[sched.split('E')[1]]);
    return !clashes.some((clash) => assignments.includes(clash));
};

const newSolution = (encoding) => {
    const solution = Array.from(Array(numberOfSlots), () => []);
    encoding.forEach((assignment, index) => {
        const exam = index + 1;
        var countAssignment = 0;
        
        for (var i = 0; i < numberOfSlots; i++ ) {
            const hasNoClash = noClasesh(exam, solution[i]);
            if (countAssignment === assignment) {
                solution[i].push(`E${exam}`);
                break;
            } else if (hasNoClash) {
                countAssignment++;
            } else {
                countAssignment = 0;
            }
        }
    });
    return solution;
};

// MAIN
// encoding = newEncoding();
// console.log(encoding, mutateEncoding(encoding), mutateEncoding(encoding), mutateEncoding(encoding));
const solution = newSolution(encoding);
console.log(solution);
