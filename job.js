document.addEventListener('DOMContentLoaded', function () {
  const totalJob = document.getElementById('total-job');
  const totalJobRight = document.getElementById('total-job-right');
  const totalInterview = document.getElementById('total-interview');
  const totalRejected = document.getElementById('total-rejected');
  const filterButtons = document.querySelectorAll(
    '.container:nth-of-type(2) .btn.font-normal',
  );
  const noJobsMsg = document.querySelector(
    '.container:nth-of-type(2) > .flex.flex-col.items-center',
  );

  function updateCounts() {
    const allJobs = document.querySelectorAll('.job-card');
    const interviewJobs = document.querySelectorAll(
      '.job-card[data-status="interview"]',
    );
    const rejectedJobs = document.querySelectorAll(
      '.job-card[data-status="rejected"]',
    );

    totalJob.innerText = allJobs.length;
    totalJobRight.innerText = allJobs.length;
    totalInterview.innerText = interviewJobs.length;
    totalRejected.innerText = rejectedJobs.length;

    // Show "No jobs" message if no jobs visible
    const visibleJobs = Array.from(allJobs).filter(
      card => card.style.display !== 'none',
    );
    noJobsMsg.classList.toggle('hidden', visibleJobs.length > 0);
  }

  function handleStatusChange(card, status) {
    card.dataset.status = status;
    card.style.borderLeft =
      status === 'interview' ? '4px solid #22c55e' : '4px solid #ef4444';

    // Remove "Not Applied" button
    const notAppliedBtn = card.querySelector(
      '.btn:not(.btn-success):not(.btn-error)',
    );
    if (notAppliedBtn) notAppliedBtn.remove();

    updateCounts();
  }

  // Delete button
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function () {
      this.closest('.job-card').remove();
      updateCounts();
    });
  });

  // Interview and Rejected buttons
  document.querySelectorAll('.job-card').forEach(card => {
    const interviewBtn = card.querySelector('.btn-success');
    const rejectedBtn = card.querySelector('.btn-error');

    interviewBtn.addEventListener('click', () =>
      handleStatusChange(card, 'interview'),
    );
    rejectedBtn.addEventListener('click', () =>
      handleStatusChange(card, 'rejected'),
    );
  });

  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.textContent.toLowerCase(); // "all", "interview", "rejected"
      document.querySelectorAll('.job-card').forEach(card => {
        card.style.display =
          filter === 'all' || card.dataset.status === filter ? 'block' : 'none';
      });
      updateCounts();
    });
  });

  updateCounts();
});
