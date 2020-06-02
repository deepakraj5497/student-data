import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Tabledata extends React.Component {
	componentDidMount() {
		const { 
				data
			} = this.props;
		axios.get('http://localhost:3500/get_data')
		.then((res) => {
		  data(res.data);
		  this.totalRank();
		});		
	}

	getdata(index) {
		const { 
			post: { post, currentPage }, getItem, redirect
			} = this.props;
		redirect(true);
		console.log(post);
		let page = (currentPage - 1) * 5;
		const { 
			name, english, tamil, maths, science, social, id, gender, department, image_name
		} = post[index + page];
		const i = index + page;
		const data = { 
			name, english, tamil, maths, science, social, id, i, gender, department, image_name
		};
		getItem(data);
	}

	totalRank =() => {
		let rankIndex;		
		let rankArr = '';
		let unorder;
		let total;
		let ordered;
		const { 
			post: { 
				post 
				}, totalrank 
			} = this.props;
		console.log(post);
		post.forEach((n) => {
			const {
				english, tamil, maths, science, social 
			} = n;
			console.log(english);
			total = english + tamil + maths + science + social;
			rankArr = `${rankArr}${total},`;
			unorder = rankArr.split(',').map(Number);
			unorder.pop();
			ordered = unorder.slice().sort((a, b) => (
				b - a
			));
		});
		let p;
		rankIndex = '';
		let rank = '';
		let rankAll;
		for (p = 0; p < ordered.length; p += 1) {
			const data = unorder[p];
			for (let i = 0; i < ordered.length; i += 1) {
				if (ordered[i] === data) {
					rankIndex = ordered.indexOf(data) + 1;
				}
			}
			rank = `${rank + rankIndex},`;
			rankAll = rank.split(',').map(Number);
			rankAll.pop();
		}
		totalrank(unorder, rankAll);
	}

	delete(key) {
		const conform = window.confirm('are you sure you want to delete this item');
		console.log(conform);
		console.log(key);
		if (conform === true) {
			const { data } = this.props;
			axios.delete(`http://localhost:3500/delete_data/${key}`).then((res) => console.log(res.data)).then((err) => console.log(err));
			axios.get('http://localhost:3500/get_data')
			.then((res) => {
		 	 data(res.data);
			});	
		} 
	}

	render() {
		const { post: { post, pageSize, currentPage } } = this.props;
		console.log(post);
		const lastIndex = currentPage * pageSize;
		const firstIndex = lastIndex - pageSize;
		const currentItem = post.slice(firstIndex, lastIndex);
		return currentItem.map((n, i) => {
		const {
 			name, english, tamil, maths, science, social, image_name, gender, department, id
			} = n;
		const total = english + tamil + maths + science + social;
		console.log(require(`../assets/${image_name}`));
		return (
			<tr key={id} className="allRows">
           		<td>{name}</td>
          		<td>{english}</td>
           		<td>{tamil}</td>
           		<td>{maths}</td>
				<td>{science}</td>
				<td>{social}</td>
				<td className="total">{total}</td>
				<Rank total={total} post={post} />
				<td><img src={require(`../assets/${image_name}`)} alt="students img" width="75px" height="50px" /></td>
				<td>{gender}</td>
				<td>{department}</td>
				<td>
					<button type="button" className="btn btn-info mr-3 py-0" onClick={this.getdata.bind(this, i)}>edit</button>
					<button type="button" className="btn btn-danger py-0" onClick={this.delete.bind(this, id)}>del</button>
				</td>
   </tr>
			);			
		});
	}
}

class Rank extends React.PureComponent {
	render() {
    	let rankIndex;		
		let rankArr = ''; let unorder; let tot; let ordered;
		const { post, total } = this.props;
    	post.forEach((n) => {
        	const {
 				english, tamil, maths, science, social 
				} = n;
        	tot = english + tamil + maths + science + social;
        	rankArr = `${rankArr + tot},`;
        	unorder = rankArr.split(',').map(Number);
        	unorder.pop();
        	ordered = unorder.slice().sort((a, b) => b - a);
    	});
    	let p;
    	rankIndex = '';
    	for (p = 0; p < ordered.length; p += 1) {
        	const data = unorder[p];
        	if (total === data) {
            	rankIndex = ordered.indexOf(data) + 1;
        	}
   		 }
	return <td>{rankIndex}</td>;	
	}	
}

const mapStatetoProps = (state) => ({
        post: state
    });

const mapDispatchtoProps = (dispatch) => ({
		deleteItem: (id) => { dispatch({ type: 'DELETE_POST', id }); },
		getItem: (data) => { dispatch({ type: 'UPDATE_POST', data }); },
		totalrank: (total, rank) => { dispatch({ type: 'TOTAL_RANK', total, rank }); },
		redirect: (data) => { dispatch({ type: 'REDIRECT', data }); },
		data: (data) => { dispatch({ type: 'DATA', data }); }
    });

export default connect(mapStatetoProps, mapDispatchtoProps)(Tabledata);
