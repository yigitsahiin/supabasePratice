const supabaseUrl = 'https://ddjmxlkdzxprbcqcmfzn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkam14bGtkenhwcmJjcWNtZnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNzQ3MzQsImV4cCI6MjAzMDk1MDczNH0.8qlWKxxVKCRi72C4uzcThEFBp_ckHEBRdQ4trJrQk0g';
const supabase = createClient(supabaseUrl, supabaseKey);

async function listStudents() {
    const { data, error } = await supabase.from('students').select('*');
    if (error) {
        console.error('Öğrenciler listelenirken hata oluştu:', error.message);
        return;
    }
    const studentList = document.querySelector('#student-list');
    studentList.innerHTML = '';
    data.forEach(student => {
        studentList.innerHTML += `<li>${student.id}: ${student.name}</li>`;
    });
}

async function updateAttendance(event) {
    event.preventDefault();
    const studentId = document.querySelector('#student-id').value;
    const lessonId = document.querySelector('#lesson-id').value;
    const status = document.querySelector('#status').value;

    const { error } = await supabase.from('attendance').insert([
        { student_id: studentId, lesson_id: lessonId, status: status }
    ]);
    if (error) {
        console.error('Yoklama güncellenirken hata oluştu:', error.message);
        return;
    }
    console.log('Yoklama başarıyla güncellendi.');
}

document.querySelector('#attendance-form').addEventListener('submit', updateAttendance);

listStudents();
