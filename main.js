// Make an indirect representation of the examination timetabling problem from the slides. Implement the following two functions:
// - Generate a feasible solution (as described in slides from 8 to 15) based on indirect encoding, and
// - Mutate an indirect encoded timetable (as described in slides 16 and 17)

const numberOfExams = 8;
const numberOfSlots = 16;
const examsWithSameStudents = [[1, 2], [4, 5, 8], [6, 4, 1]]
const encoding = [4, 5, 13, 1, 1, 4, 13, 2];

const mutate = (encoding) => {
    return encoding;
};

const solution = encoding.map((assignment) => {
  return assignment;
});

console.log(solution)
