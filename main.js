// PARAMETERS
const numberOfExams = 8;
const exams = Array.from({length: numberOfExams}, (_, i) => i + 1)
const numberOfSlots = 16;
const slotsPerDay = 4;
let encoding = [4, 5, 13, 1, 1, 4, 13, 2];
let mutatedEncoding = [4, 5, 13, 9, 1, 4, 13, 2];

// CLASHES
const sameStudentsExam = {};
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
    if (!clashes || clashes.length === 0) return true;
    if (!scheduledExams || scheduledExams.length === 0) return true;

    return !scheduledExams.some((sched) => clashes.includes(sched));
};

const newSolution = (encoding) => {
    var totalAssignments = 0;
    const solution = Array.from(Array(numberOfSlots), () => []);
    encoding.forEach((assignment, index) => {
        const exam = index + 1;
        var countAssignment = 1;
        
        for (var i = 0; i < numberOfSlots; i++ ) {
            const hasNoClash = noClasesh(exam, solution[i]);
            if (hasNoClash && countAssignment === assignment) {
                solution[i].push(exam);
                totalAssignments++;
                break;
            } else if (hasNoClash) {
                countAssignment++;
            }
        }
    });

    const valid = totalAssignments === encoding.length;
    return [valid, solution];
};

const trySolving = (encoding = null) => {
    while (true) {
        const _encoding = encoding || newEncoding();
        const [valid, solution]  = newSolution(_encoding);
        if (valid) return solution;
    }

    return solution;
};

const tryMutating = (encoding) => {
    while (true) {
        const _encoding = mutateEncoding(encoding);
        const [valid, solution]  = newSolution(_encoding);
        if (valid) return solution;
    }
};

// MAIN
const solution = trySolving(encoding);
console.log("Feasible solution reached", solution);

const mutatedSolution = trySolving(mutatedEncoding);
console.log("Mutated solution reached", mutatedSolution);

const genMutatedSolution = tryMutating(encoding);
console.log("Generated mutation solution reached", genMutatedSolution);
