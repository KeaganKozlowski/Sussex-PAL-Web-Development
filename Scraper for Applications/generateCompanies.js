const axios = require('axios');
const cheerio = require('cheerio');

//Adding companies to a list
let companies = [];

const baseUrl = 'https://companiesmarketcap.com/gbp/tech/largest-tech-companies-by-market-cap/?page='

async function fetchCompanies(page){
    try {
        const { data } = await axios.get(`${baseUrl}${page}`);
        const $ = cheerio.load(data);
        $('.company-name').each((index, element) => {
            const companyName = $(element).text().trim();
            companies.push(companyName);
        });
    } catch (error){
        console.error('Error fetching companies from page ${page}:', error);
    }
}

async function fetchAllCompanies() {
    const totalPages = 10; //Current each page is 100 companies, so this gives us a list of 1000 companies

    for (let page = 1; page <= totalPages; page++) {
        await fetchCompanies(page);
    }

    console.log('Total companies fetched:', companies.length);
    console.log('Companies:', companies); 
    companies.length = 10; //To save my requests for the API
    console.log("New list of companies and length:",companies,companies.length);
}

//Calling the api and using that to search for each company
///Dictionary to store the companies and their positions
let jobs = {};

async function fetchJobsForCompanies(company){
    const options = {
        method: 'GET',
        url: `https://indeed12.p.rapidapi.com/company/${company}/jobs`, //Initally to test this was set to Ubisoft
        params: {
          locality: 'gb',
          start: '1'
        },
        headers: {
          'x-rapidapi-key': '7c99c01842mshf87bf3dca38cd9dp1aa95fjsn14379ac49fd6',
          'x-rapidapi-host': 'indeed12.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
          jobs[company] = response.data;
      } catch (error) {
          console.error(error);
      }
}

async function fetchAllJobsForCompanies(){
    for (const company of companies){
        await fetchJobsForCompanies(company);
        ;
    }
    console.log(jobs);
}

async function main(){
    await fetchAllCompanies();
    await fetchAllJobsForCompanies();
    //Writing data to the file so I can store for later so I don't need to make anymore API calls
    const fs = require('fs');
    try {
        fs.writeFileSync('JobsWithCompanies.txt', JSON.stringify(jobs, null, 2));
        console.log("Done successfully")
    } catch (error){
        console.log("This is the error: ",error);
    }
}

main();



