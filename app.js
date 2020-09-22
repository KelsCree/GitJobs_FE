const baseURL = 'http://localhost:3000'
const jobsURL = `${baseURL}/jobs`
const createJobForm = document.querySelector('#create-a-job')
let likes = 0

fetch(jobsURL)
    .then(parseJSON)
    .then(showJobCards)

    
function showJobCards(jobs) {
    jobs.forEach(job => showJobCard(job, jobsContainer))
}

function showJobCard(job, jobsContainer) {
        const jobCard = document.createElement('div')
        const logo = document.createElement('a')
        const jobTitle = document.createElement('h3')
        const jobCompany = document.createElement('p')
        const jobLocation = document.createElement('p')
        const deleteButton = document.createElement('button')

        const jobLikes = document.createElement('p')

        const jobTitleField = document.createElement('input')
        const likeButton = createLikeButton(job, jobLikes)
        const updateButton = createUpdateButton(job, title)

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



        deleteButton.addEventListener('click', () => {
            deleteJob(job)
            jobCard.remove()
    })
}

function incrementLikes(job, jobLikes) {
        job.likes++
        jobLikes.textContent = `${job.likes} likes`
        console.log(job)
}

function deleteJob(job) {
    fetch(`${jobsURL}/${job.id}`, {method: 'DELETE'})
        .then(response => response.json())
        .then(console.log)
}

function createLikeButton(job, jobLikes) {
    const likeButton = document.createElement('button')
    likeButton.textContent ="Like Job"
    likeButton.addEventListener('click', () => incrementLikes(job, jobLikes))
    return likeButton
}

function createUpdateButton(job, title) {
    const updateButton = document.createElement('input')
    updateButton.addEventListener('submit', event => updateTitle(event, job, title))
    updateButton.type = 'submit'
    return updateButton
}

function submitForm(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const title = formData.get('title')
    const company = formData.get('company')
    const location = formData.get('location')
    const company_url = formData.get('company_url')
    const logo_url = formData.get('logo_url')
    const job = {
        title, 
        company, 
        location,
        company_url,
        logo_url }
        const jobsContainer = document.querySelector('#job-container')
        showJobCard(job, jobsContainer)

    fetch(jobsURL, {
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

function updateTitle(event, job, titleElement) {
    event.preventDefault()
console.log(event.target)
    const formData = new FormData(event.target)
    
    const title = formData.get('title')

    titleElement.textContent = title

    fetch(`${jobsURL}/${job.id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify( {title})
    }) .then(response => response.json())
        .then(console.log)
}

function parseJSON(response) {
    return response.json()
}