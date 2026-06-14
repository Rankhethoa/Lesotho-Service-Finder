/*
document.getElementById("editBtn").addEventListener("click", () => {
    window.location.href = "provider-account.html"; 
  });

*/
  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        window.location.href = `provider-account.html?id=${id}`;
    });
});