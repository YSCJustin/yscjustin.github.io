console.log("Hello World!");
//ignore everything below

let schools = [];
let category = []; 
let gender = [];
let session = [];
let district = [];
let finance_type = [];
let school_level = [];
let religion = [];
document.addEventListener('DOMContentLoaded', async function() {
    await fetch('schools.json').then(response => response.json()).then(data => schools = data);
    for(let i = 0; i < schools.length; i++) {
        if(!category.includes(schools[i]["ENGLISH CATEGORY"])) category.push(schools[i]["ENGLISH CATEGORY"]);
        if(!gender.includes(schools[i]["STUDENTS GENDER"])) gender.push(schools[i]["STUDENTS GENDER"])
        if(!session.includes(schools[i]["SESSION"])) session.push(schools[i]["SESSION"])
        if(!finance_type.includes(schools[i]["FINANCE TYPE"])) finance_type.push(schools[i]["FINANCE TYPE"])
        if(!school_level.includes(schools[i]["SCHOOL LEVEL"])) school_level.push(schools[i]["SCHOOL LEVEL"])
        if(!religion.includes(schools[i]["RELIGION"])) religion.push(schools[i]["RELIGION"])
        if(!district.includes(schools[i]["DISTRICT"])) district.push(schools[i]["DISTRICT"])

    }
    category.sort();
    gender.sort();
    session.sort();
    finance_type.sort();
    school_level.sort();
    religion.sort();
    district.sort();

    const categorySelect = document.getElementById('category');
    const genderSelect = document.getElementById('gender');
    const sessionSelect = document.getElementById('session');
    const financeTypeSelect = document.getElementById('finance');
    const schoolLevelSelect = document.getElementById('level');
    const religionSelect = document.getElementById('religion');
    const districtSelect = document.getElementById('district');
    const name = document.getElementById('name');
    for(let i = 0; i < category.length; i++) {
        let option = document.createElement('option');
        option.value = category[i];
        option.innerHTML = category[i];
        categorySelect.appendChild(option);
    }
    for(let i = 0; i < gender.length; i++) {
        let option = document.createElement('option');
        option.value = gender[i];
        option.innerHTML = gender[i];
        genderSelect.appendChild(option);
    }
    for(let i = 0; i < session.length; i++) {
        let option = document.createElement('option');
        option.value = session[i];
        option.innerHTML = session[i];
        sessionSelect.appendChild(option);
    }
    for(let i = 0; i < finance_type.length; i++) {
        let option = document.createElement('option');
        option.value = finance_type[i];
        option.innerHTML = finance_type[i];
        financeTypeSelect.appendChild(option);
    }
    for(let i = 0; i < school_level.length; i++) {
        let option = document.createElement('option');
        option.value = school_level[i];
        option.innerHTML = school_level[i];
        schoolLevelSelect.appendChild(option);
    }
    for(let i = 0; i < religion.length; i++) {
        let option = document.createElement('option');
        option.value = religion[i];
        option.innerHTML = religion[i];
        religionSelect.appendChild(option);
    }
    for(let i = 0; i < district.length; i++) {
        let option = document.createElement('option');
        option.value = district[i];
        option.innerHTML = district[i];
        districtSelect.appendChild(option);
    }

    const searchButton = document.getElementById('search');
    const searchID = document.getElementById('searchID');
    const id = document.getElementById('id');
    searchID.addEventListener('click', function() {
        const result = document.getElementById('result');
        result.innerHTML = "";
        let idValue = id.value;
        let filteredSchools = schools.filter(school => {
            return school["SCHOOL NO."] == idValue;
        })
        let size = filteredSchools.length;
        let sizeText = document.createElement('p');
        if(size == 0) sizeText.innerHTML = "No results found!";
        else sizeText.innerHTML = "Found!";
        result.appendChild(sizeText);
        for(let object in filteredSchools) {
            let school = filteredSchools[object];
            for(let property in school) {
                let schooltext
                if(isValidUrl(school[property])) {
                    schooltext = document.createElement('a');
                    schooltext.style="display: block; margin: 10px 0;";
                    schooltext.href = school[property];
                } else {
                    schooltext = document.createElement('p');
                }
                schooltext.style.fontSize= '20px';
                schooltext.innerHTML = `${property}: ${school[property]}`;
                result.appendChild(schooltext);
            }
        }
    })
    searchButton.addEventListener('click', function() {
        const result = document.getElementById('result');
        result.innerHTML = "";
        let categoryValue = categorySelect.value
        let genderValue = genderSelect.value
        let sessionValue = sessionSelect.value
        let financeTypeValue = financeTypeSelect.value
        let schoolLevelValue = schoolLevelSelect.value
        let religionValue = religionSelect.value
        let districtValue = districtSelect.value

        let filteredSchools = schools.filter(school => {
            return (categoryValue == "" || school["ENGLISH CATEGORY"] == categoryValue) &&
            (genderValue == "" || school["STUDENTS GENDER"] == genderValue) &&
            (sessionValue == "" || school["SESSION"] == sessionValue) &&
            (financeTypeValue == "" || school["FINANCE TYPE"] == financeTypeValue) &&
            (schoolLevelValue == "" || school["SCHOOL LEVEL"] == schoolLevelValue) &&
            (religionValue == "" || school["RELIGION"] == religionValue || (religionValue == 'N.A.' && school["RELIGION"] == 'NOT APPLICABLE') || (religionValue == 'NOT APPLICABLE' && school["RELIGION"] == 'N.A.')) &&
            (districtValue == "" || school["DISTRICT"] == districtValue) &&
            (name.value == "" || search(school["ENGLISH NAME"]))
        })

        filteredSchools.sort((a, b) => {
            return a["ENGLISH NAME"].localeCompare(b["ENGLISH NAME"])
        })
        let size = filteredSchools.length;
        let sizeText = document.createElement('p');
        sizeText.innerHTML = "Results: " + size;
        result.appendChild(sizeText);
        for(let object in filteredSchools) {
            let school = filteredSchools[object];
            let schoolName = `(${school["SCHOOL NO."]})  ${school["ENGLISH NAME"]}`;

            let schooltext = document.createElement('p');
            
            schooltext.innerHTML = schoolName;
            result.appendChild(schooltext);
        }

        
    })
    function search(schoolname) {
        let input = name.value;
        let checkbox = document.getElementById('acro');

        input = input.trim('').toLowerCase();
        let words = input.split(" ");
        let bruh = schoolname.toLowerCase();
        if(!checkbox.checked){
            let found = true;
            for(let i = 0; i < words.length; i++) {
                if(!bruh.includes(words[i])) {
                    found = false;
                    break;
                }
            }
            if(found) return true;
            else return false;
        } 

            let acronym = input;

    
            let schoolWords = bruh.split(" ");
            let schoolAcronym = "";
            let j = 0;
            for(let i = 0; i < schoolWords.length; i++) {
                if(schoolWords[i][0] !== ' ' && schoolWords[i][0] ==  acronym[j]){
   
                    schoolAcronym += schoolWords[i][0];
                    j++;
                } else if(i == 0){
                    return false;
                }
            }
            if(schoolAcronym == acronym) return true;
            else return false;





    
    }
})



const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}