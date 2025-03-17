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

fetchAllCompanies();

//Calling the api and using that to search for each company
///Dictionary to store the companies and their positions
let jobs = {};

async function fetchJobsForCompanies(company){
    const options = {
        method: 'GET',
        url: `https://indeed12.p.rapidapi.com/${company}/Ubisoft/jobs`,
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
          jobs[company] = response;
      } catch (error) {
          console.error(error);
      }
}

async function fetchAllJobsForCompanies(){
    for (const company of companies){
        await fetchJobsForCompanies(company);
    }
    console.log(jobs)
}

