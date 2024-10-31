import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
        import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

        const firebaseConfig = {
            apiKey: "AIzaSyCjKjfNp6Jg6LlR2gyzneDov8ZhRBg8DOM",
            authDomain: "compas-59487.firebaseapp.com",
            projectId: "compas-59487",
            storageBucket: "compas-59487.appspot.com",
            messagingSenderId: "103208223226",
            appId: "1:103208223226:web:0b023a3e239ac00a632443",
            measurementId: "G-ZF26B64MVD"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const maintenanceRef = collection(db, "maintenance");
        let deleteId = null;

        async function loadMaintenanceData() {
            const snapshot = await getDocs(maintenanceRef);
            snapshot.forEach((doc) => {
                const data = doc.data();
                createCard(doc.id, data.judul, data.deskripsi, data.tanggalWaktu, data.userAgent);
            });
        }

        function createCard(id, judul, deskripsi, tanggalWaktu, userAgent) {
            const cardHTML = `
                <div class="shadow-sm card mb-3" id="${id}">
                    <div class="card-body">
                        <h5 class="card-title">${judul}</h5>
                        <p class="card-text">${deskripsi}</p>
                        <p class="text-muted">Dibuat pada: ${tanggalWaktu}</p>
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#trackModal" onclick="showUserAgent('${userAgent}')">Lacak</button>
                        <button type="button" class="btn btn-danger" onclick="openDeleteModal('${id}')">Hapus</button>
                    </div>
                </div>
            `;
            document.getElementById('maintenanceList').insertAdjacentHTML('beforeend', cardHTML);
        }

        document.getElementById('maintenanceForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const judul = document.getElementById('judul').value;
            const deskripsi = document.getElementById('deskripsi').value;
            const tanggalWaktu = new Date().toLocaleString();
            const userAgent = navigator.userAgent;

            await addDoc(maintenanceRef, { judul, deskripsi, tanggalWaktu, userAgent });
            createCard('', judul, deskripsi, tanggalWaktu, userAgent);
            document.getElementById('maintenanceForm').reset();
            bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
        });

        window.showUserAgent = function(agent) {
            document.getElementById('userAgentInfo').textContent = agent;
        };

        window.openDeleteModal = function(id) {
            deleteId = id;
            bootstrap.Modal.getOrCreateInstance(document.getElementById('accessKeyModal')).show();
        };

        document.getElementById('deleteButton').addEventListener('click', async function() {
            const accessKey = document.getElementById('accessKeyInput').value;
            if (accessKey === "smtiyktm") {
                await deleteDoc(doc(maintenanceRef, deleteId));
                document.getElementById(deleteId).remove();
                bootstrap.Modal.getInstance(document.getElementById('accessKeyModal')).hide();
                deleteId = null;
            } else {
                alert("Kunci akses salah");
            }
        });

        loadMaintenanceData();