# jobit_jobs_api

# The Jobs API has seven routes:

## 1: Get all jobs (GET)
#### This retrieves all the jobs
#### Endpoint:  /jobs

## 1: Get single job (GET)
#### This retrieves a single job based on the id passed into the url
#### Endpoint:  /jobs/1

## 1: Get jobs by search term (GET)
#### This retrieves job(s) matching or contains the search term passed by the user. This search term matches the title of the job
#### Endpoint:  /jobs/search?q=Software

## 1: Get jobs by filters (GET)
#### This retrieves job(s) matching any filter passed such as title, company_name etc
#### Endpoint:  /jobs/filter?title=Software Engineer&type=Part Time

## 1: Add a job (POST)
#### This adds the job to the existing jobs
#### Endpoint:  /jobs

## 1: Add a job (PUT)
#### This updates the job basing on the id of the job to be updated
#### Endpoint:  /jobs/1

## 1: Add a job (PUT)
#### This deletes a job matching the id passed in the url
#### Endpoint:  /jobs/1
