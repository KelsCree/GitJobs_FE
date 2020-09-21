const base_URL = 'http://localhost:3000/jobs'
const jobsContainer = document.querySelector('#job-container')
const form = document.querySelector('#create-a-job')
const likes = 0

fetch(base_URL)
    .then(response => response.json())
    .then(jobs => createJobCard(jobs))
    
function createJobCard(jobs){
    jobs.forEach(createJobCard)

function createJobCard(job){
        const jobCard = document.createElement('div')
        const logo = document.createElement('a')
        const jobTitle = document.createElement('h3')
        const jobCompany = document.createElement('p')
        const jobLocation = document.createElement('p')
        const deleteButton = document.createElement('button')
        const likeButton = document.createElement('button')
        const jobLikes = document.createElement('p')
        const updateButton = document.createElement('input')
        const jobTitleField = document.createElement('input')


        jobLikes.textContent =  `${likes} likes`
        jobTitle.textContent = job.title
        logo.innerHTML = `<img src=${job.logo_url}alt =${job.company}logo>`
        logo.href = `${job.company_url}`
        logo.id = 'logo'
        jobCard.classList.add('job-card')
        // jobCard.innerHTML = `<a href="${job.company_url}"><div><div/></a>`
        jobCompany.innerText = job.company
        jobLocation.innerText = job.location
        deleteButton.textContent = "Delete Job"
        updateButton.type = 'submit'
        likeButton.textContent ="Like Job"
        jobTitleField.textContent = "title"

        jobCard.append(
            jobTitle, 
            logo, 
            jobCompany, 
            jobLocation, 
            jobLikes, 
            jobTitleField, 
            updateButton, 
            likeButton,
            deleteButton)
        jobsContainer.append(jobCard) 
        
        updateButton.addEventListener('submit', (event) => updateTitle(event, job, title))

        likeButton.addEventListener('click', ()=> {
            job.likes++
            jobLikes.textContent = `${job.likes} likes`
            console.log(job)
        })

        deleteButton.addEventListener('click', () => {
            deleteJob(job)
            jobCard.remove()
    })
}

function deleteJob(job){
    fetch(`${base_URL}/${job.id}`, {method: 'DELETE'})
        .then(response => response.json())
        .then(console.log)
}
form.addEventListener('submit', submitForm)

function submitForm(event){
    event.preventDefault()

    const formData = new FormData(event.target)
    const title = formData.get('title')
    const company = formData.get('company')
    const location = formData.get('location')
    const company_url = formData.get('company_url')
    const logo_url = formData.get('logo_url')
    const jobs = {
        title, 
        company, 
        location,
        company_url,
        logo_url }

    createJobCard(jobs)

    fetch(base_URL, {
        method: 'POST', 
        headers: { 'Content-type' : 'application/json'},
        body: JSON.stringify({
            title, 
            company, 
            location, 
            company_url, 
            logo_url
        })
    })
}
}

function updateTitle(event, job, titleElement) {
    event.preventDefault()
console.log(event.target)
    const formData = new FormData(event.target)
    
    const title = formData.get('title')

    titleElement.textContent = title

    fetch(`${base_URL}/${job.id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify( {title})
    }) .then(response => response.json())
        .then(console.log)
}