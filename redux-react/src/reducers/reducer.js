
const initialState = {
 post: [],
add: true,
name: '',
english: '',
tamil: '',
maths: '',
science: '',
social: '',
id: '',
index: '',
img: 'https://via.placeholder.com/150',
imgName: '',
imgType: '',
imgData: false,
newimg: '',
pageSize: 5,
currentPage: 1,
sortOn: false,
direction: 'asc',
oldDirection: '',
className1: false,
className2: false,
nameClass: false,
englishClass: false,
tamClass: false,
mathClass: false,
sciClass: false,
socClass: false,
totalClass: false,
rankClass: false,
key: '',
nameCheck: 'form-control',
englishCheck: 'form-control',
tamilCheck: 'form-control',
mathsCheck: 'form-control',
scienceCheck: 'form-control',
socialCheck: 'form-control',
success: '',
edit: '',
addRedirect: '',
gender: 'male',
department: 'A',
dropdown: 5
};

const reducerExample = (state = initialState, action) => {
    switch (action.type) {
        case 'DATA': 
            console.log(action.data);
            return {
                ...state,
                post: action.data
            };
        case 'DELETE_POST': {
                const newData = state.post.filter((post) => action.id !== post.id);
            return {
                ...state,
                post: newData
             };
            }
        case 'INPUT_CHANGE': 
            return {
                ...state,
                [action.name]: action.value
            };
        case 'ADD_DATA': 
            console.log(action.data);
            return {
                ...state,
                name: '',
                english: '',
                tamil: '',
                maths: '',
                science: '',
                social: '',
                gender: 'male',
                department: 'A',
                img: 'https://via.placeholder.com/150'
            };
        case 'UPDATE_POST':
            console.log(action.data.image_name);
            return {
                ...state,
                name: action.data.name,
                english: action.data.english,
                tamil: action.data.tamil,
                maths: action.data.maths,
                science: action.data.science,
                social: action.data.social,
                id: action.data.id,
                gender: action.data.gender,
                department: action.data.department,
                add: false,
                index: action.data.i,
                img: action.data.image_name,
                imgName: action.data.image_name,
                imgData: true
            };
        case 'UPDATE_DATA': {
             return {
                ...state,
                add: true,
                name: '',
                english: '',
                tamil: '',
                maths: '',
                science: '',
                social: '',
                department: 'A',
                img: 'https://via.placeholder.com/150',
                imgData: false
            };
        }
        case 'CURRENT_PAGE': 
            return {
                ...state,
                currentPage: action.data
            };
        case 'PAGE_SIZE': 
            return {
                ...state,
                post: action.newData,
                pageSize: action.data,
                dropdown: action.data
            };
        case 'SORT_DIRECTION': 
            return {
                ...state,
                direction: action.data
            };
        case 'OLD_DIRECTION': 
            return {
                ...state,
                oldDirection: action.data
            };
        case 'SORTING': 
            console.log(action.data);
            return {
                ...state,
                post: action.data,
                className1: action.className1,
                className2: action.className2
            };
        case 'ICON': 
            return {
                ...state,
                [action.data]: true
            };
        case 'IMG_UPLOAD': 
            console.log(action.imgName);
            return {
                ...state,
                img: action.data,
                imgName: action.imgName,
                imgType: action.imgType,
                imgData: false
            };
        case 'ALL_CLASS': 
            return {
                ...state,
                nameClass: false,
                englishClass: false,
                tamClass: false,
                mathClass: false,
                sciClass: false,
                socClass: false,
                totalClass: false,
                rankClass: false,
            };
        case 'KEY': 
            return {
                ...state,
                key: action.data
            };
        case 'SORT_ON': 
            return {
                ...state,
                sortOn: action.data
            };
        case 'TOTAL_RANK': {
            const totalRank = [];
            state.post.forEach((content, i) => { 
                const data = content; 
                data.total = action.total[i];
                data.rank = action.rank[i];
                totalRank.push(data);
            });
            return {
                ...state,
                post: totalRank
            };
        }
        case 'ERROR': 
            return {
                ...state,
                [action.name]: action.data
            };
        case 'NOERROR': 
            return {
                ...state,
                nameCheck: action.data,
                englishCheck: action.data,
                tamilCheck: action.data,
                mathsCheck: action.data,
                scienceCheck: action.data,
                socialCheck: action.data
            };
        case 'SUCCESS': 
            return {
                ...state,
                success: action.data
            };
        case 'REDIRECT': 
            return {
                ...state,
                edit: action.data
            };
        case 'REDIRECT_ADD': 
            return {
                ...state,
                addRedirect: action.data
            };
        case 'DUPLICATE_POST': 
            return {
                ...state,
                duplicate: action.data
            };
        default: 
            return state;
    }
};
export default reducerExample;
