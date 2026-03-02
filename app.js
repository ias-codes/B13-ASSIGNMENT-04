let JobCardsInput = document.querySelectorAll('.jobs-total-card');
let totalJobsCard = JobCardsInput.length;

//  input total jobs
let totalJobs = document.getElementById('total-job');
let totalInterviews = document.getElementById('total-interview');
let totalRejected = document.getElementById('total-rejected');
document.getElementById('total-job-right').innerText = totalJobsCard;

totalJobs.innerText = totalJobsCard;

