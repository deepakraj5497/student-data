import React from 'react';
import { connect } from 'react-redux';
import {
	 Form, FormGroup, Label, Input, FormText 
		} from 'reactstrap';
import axios from 'axios';

class FormInput extends React.Component {
	componentDidMount() {
		const {
			redirect
			} = this.props;
		  redirect('');
		}
	
	handleChange=(e) => {
		const { name } = e.target;
		let { value } = e.target;
		console.log(name);
		console.log(value);
		const { errorclass, inputChange } = this.props;
		if (name === 'english' || name === 'tamil' || name === 'maths' || name === 'science' || name === 'social') {
			if (value > 100) {
				return;
			} if (value < 100) {
				value = e.target.value.substr(0, 3);
			} else {
				value = e.target.value.replace(/[^0-9.]/g, '');
			}
		}
		if (name !== '') {
			if (name === 'name') {
				errorclass('nameCheck', 'form-control');
			} else if (name === 'english') {
				errorclass('englishCheck', 'form-control');
			} else if (name === 'tamil') {
				errorclass('tamilCheck', 'form-control');
			} else if (name === 'maths') {
				errorclass('mathsCheck', 'form-control');
			} else if (name === 'science') {
				errorclass('scienceCheck', 'form-control');
			} else if (name === 'social') {
				errorclass('socialCheck', 'form-control');
			}
		}
		inputChange(name, value);
	}

	handleImage = (event) => {
		const { 
			imgupload
		} = this.props;
		console.log(event.target.files[0]);
		let files = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = function () {
			imgupload(this.result, files.name, files.type);	
		};
	}

	handleUpdate() {
		const { 
				post: { 
					name, english, tamil, maths, science, social, id, gender, department, imgName, img, imgData
					}, errorclass, noerror, updateData, redirect
			} = this.props;
		console.log(imgData);
		if (name === '' || english === '' || tamil === '' || maths === '' || science === '' || social === '') {
			if (name === '') {
				errorclass('nameCheck', 'form-control error');
			} else if (english === '') {
				errorclass('englishCheck', 'form-control error');
			} else if (tamil === '') {
				errorclass('tamilCheck', 'form-control error');
			} else if (maths === '') {
				errorclass('mathsCheck', 'form-control error');
			} else if (science === '') {
				errorclass('scienceCheck', 'form-control error');
			} else if (social === '') {
				errorclass('socialCheck', 'form-control error');
			}	
			return;	
		}
		noerror('form-control');
		axios.patch('http://localhost:3500/update_data', {
			name, english, tamil, maths, science, social, gender, department, imgName, id, img, imgData
		}).then((res) => console.log(res.data)).then((err) => console.log(err));
		
		window.alert("Updated successfully");
		updateData();
		redirect(false);
	}

	handleClick() {
		const { 
			post: { 
				post, name, english, tamil, maths, science, social, gender, department, img, imgName, imgType, imgData 
				}, errorclass, noerror, addData, redirectadd
			} = this.props;
		const id = post.length + 1;
		const newData = {
			name,
		   english: parseInt(english, 10),
		   tamil: parseInt(tamil, 10),
		   maths: parseInt(maths, 10),
		   science: parseInt(science, 10),
		   social: parseInt(social, 10),
		   id, 
		   gender,
		   department,
		   img 
		   };
		if (name === '' || english === '' || tamil === '' || maths === '' || science === '' || social === '') {
			if (name === '') {
   				errorclass('nameCheck', 'form-control error');
			} else if (english === '') {
   				errorclass('englishCheck', 'form-control error');
			} else if (tamil === '') {
   				errorclass('tamilCheck', 'form-control error');
			} else if (maths === '') {
   				errorclass('mathsCheck', 'form-control error');
			} else if (science === '') {
   				errorclass('scienceCheck', 'form-control error');
			} else if (social === '') {
   				errorclass('socialCheck', 'form-control error');
			}	
			return;	
		}
		noerror('form-control');
		axios.post('http://localhost:3500/upload_data', {
            name, english, tamil, maths, science, social, gender, department, imgType, imgName, img, imgData
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
              console.log(error);
		  });	
		const data = post.concat(newData);
		console.log(newData);
		console.log(data);
		addData(data, newData);
		window.alert('Added successfully');
		redirectadd(true);
	}

	render() {
		let button;
		const { 
			post: { 
					add, name, nameCheck, english, englishCheck, tamil, tamilCheck,
					maths, mathsCheck, social, socialCheck, science, scienceCheck, gender, section, img, imgData
				  }
			} = this.props;
		console.log(img);
		let image;
		if (imgData === true) {
			image = require(`../assets/${img}`);
		} else {
			image = img;
		}
		if (add === true) {
			button = <button type="button" className="btn btn-info" onClick={this.handleClick.bind(this)}>Add Member</button>;
		} else if (add === false) {
			button = <button type="button" className="btn btn-info" onClick={this.handleUpdate.bind(this)}>update Member</button>;
		}
		return (
			<Form className="w-25 mx-auto">
				<h4 className="mt-3 text-info">STUDENT TABLE LIST UPDATER</h4>
				<FormGroup>
					<Label htmlFor="name" className="font-weight-bold">
						Name:
					<br />
					<Input
						type="text"
						name="name"
						value={name}
						onChange={this.handleChange}
						className={nameCheck}
					/>
					</Label>
					<br />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="english" className="font-weight-bold">
						English:
					<br />
					<Input
						type="text"
						name="english"
						value={english}
						onChange={this.handleChange}
						className={englishCheck}
					/>
					</Label>
					<br />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="tamil" className="font-weight-bold">
						Tamil:
					<br />
					<Input
						type="text"
						name="tamil"
						value={tamil}
						onChange={this.handleChange}
						className={tamilCheck}
					/>
					</Label>
				<br />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="maths" className="font-weight-bold">
						Maths:
					<br />
					<Input
						type="text"
						name="maths"
						value={maths}
						onChange={this.handleChange}
						className={mathsCheck}
					/>
					</Label>
					<br />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="science" className="font-weight-bold">
						Science:
						<br />
					<Input
						type="text"
						name="science"
						value={science}
						onChange={this.handleChange}
						className={scienceCheck}
					/>
					</Label>
				<br />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="social" className="font-weight-bold">
						Social:
				<br />
					<Input
						type="text"
						name="social"
						value={social}
						onChange={this.handleChange}
						className={socialCheck}
					/>
					</Label>
				<br />
				</FormGroup>
				<FormGroup>
					<Input 
					style={{ display: 'none' }} 
					type="file" 
					className="form-control-file border" 
					id="file"
					onChange={this.handleImage}
					/>
				    <FormText color="muted">
						Choose a student piture
        </FormText>
					<img src={image} className="mr-4" style={{ borderRadius: '30%' }} alt="student pic" width="150px" height="150px" />
					<button type="button" onClick={() => document.querySelector('#file').click()}>
						<i className="fa fa-upload" style={{ marginLeft: '5px' }} />
					</button>
				<br />
				</FormGroup>
				<FormGroup>
  					<Label htmlFor="male">
					  <Input type="radio" name="gender" onChange={this.handleChange} checked={gender === 'male'} value="male" /> 
					  Male 
				   </Label>
				   <br />
  					<Label htmlFor="female">
					  <Input type="radio" name="gender" onChange={this.handleChange} checked={gender === 'female'} value="female" />  
					  Female
				   </Label>
					<br />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="department" className="font-weight-bold">
						Department:
				<br />
					<Input className="w-75 mx-auto" type="select" value={section} onChange={this.handleChange} name="department">
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
					</Input>
					</Label>
				</FormGroup>
				{button}
			</Form>
		);
	}
}

const mapStatetoProps = (state) => ({
        post: state
    });
const mapDispatchtoProps = (dispatch) => ({
		inputChange: (name, value) => { dispatch({ type: 'INPUT_CHANGE', name, value }); },
		addData: (data, newData) => { dispatch({ type: 'ADD_DATA', data, newData }); },
		updateData: () => { dispatch({ type: 'UPDATE_DATA' }); },
		errorclass: (name, data) => { dispatch({ type: 'ERROR', name, data }); },
		success: (data) => { dispatch({ type: 'SUCCESS', data }); },
		noerror: (data) => { dispatch({ type: 'NOERROR', data }); },
		redirect: (data) => { dispatch({ type: 'REDIRECT', data }); },
		redirectadd: (data) => { dispatch({ type: 'REDIRECT_ADD', data }); },
		imgupload: (data, imgName, imgType) => { 
			dispatch({ 
			type: 'IMG_UPLOAD', data, imgName, imgType 
			});
		 },
		data: (data) => { dispatch({ type: 'DATA', data }); }
    });

export default connect(mapStatetoProps, mapDispatchtoProps)(FormInput);
