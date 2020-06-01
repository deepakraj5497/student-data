import React from 'react';
import { connect } from 'react-redux';

class Tablehead extends React.Component {
    sortBynum(k) {
		const {
            post: {
                key
               }, keyItem, directionValue, allclass, icon
           } = this.props;
        keyItem(k);
        if (k !== key) {
			console.log(k);
			console.log(key);
			directionValue('asc');
			allclass();
		}
        switch (k) {
			case 'name':
				icon('nameClass', true);
				break;
			case 'english':
				icon('englishClass', true);
				break;
			case 'tamil':
				icon('tamClass', true);
				break;
			case 'maths':
				icon('mathClass', true);
				break;
			case 'science':
				icon('sciClass', true);
				break;
			case 'social':
				icon('socClass', true);
				break;
			case 'total':
				icon('totalClass', true);
				break;
			case 'rank':
				icon('rankClass', true);
				break;	
			default: break;
		}
		this.sorting(k);
    }

    sorting(keyitem) {
		const {
            post: {
                post, key, direction
               }, sort, directionValue, sortOn, oldDirection
		   } = this.props;
		const newArray = [...post];
		let value = direction;
		if (keyitem !== key) {
			console.log(keyitem);
			console.log(key);
			value = 'asc';
		}
		if (value === 'asc') {
			if (keyitem === 'name') {
				newArray.sort((a, b) => a.name.localeCompare(b.name));
			} else {
				newArray.sort((a, b) => a[keyitem] - b[keyitem]);
			}
			sort(newArray, true, false);
			oldDirection(value);
			directionValue('dsc');
            sortOn(true);
		} else if (value === 'dsc') {
			if (keyitem === 'name') {
				newArray.sort((a, b) => b.name.localeCompare(a.name));
			} else {
				newArray.sort((a, b) => b[keyitem] - a[keyitem]);
			}
			sort(newArray, false, true);
			oldDirection(value);
            directionValue('asc');
		} 
	}

    render() {
		let nameCls; let engCls; let tamCls; 
		let mathCls; let sciCls; let socCls; let totalCls; let rankCls;
		const {
            post: {
				className1, className2, nameClass, englishClass, 
				tamClass, mathClass, sciClass, socClass, totalClass, rankClass
               } 
		   } = this.props;
		let icon;
        if (className1 === true) {
			icon = 'fa fa-caret-down';
		 } else if (className2 === true) {
			 icon = 'fa fa-caret-up';
		  } else {
			icon = '';
		  }
        if (nameClass === true) {
            nameCls = icon; 
		} else if (englishClass === true) {
			engCls = icon;
		} else if (tamClass === true) {
			tamCls = icon;
		} else if (mathClass === true) {
			mathCls = icon;
		} else if (sciClass === true) {
			sciCls = icon;
		} else if (socClass === true) {
			socCls = icon;
		} else if (totalClass === true) {
			totalCls = icon;
		} else if (rankClass === true) {
			rankCls = icon;
		} 
        return (
        <thead style={{ textAlign: 'center' }}>
			<tr style={{ backgroundColor: 'black', color: 'white' }}>
                <th style={{ width: '120px', padding: '12px 0px' }}>
					<button 
						type="button"
						onClick={this.sortBynum.bind(this, 'name')}
                    	className="headingButton w-100 text-decoration-none text-white"
					>
						Name
						<i className={nameCls} style={{ marginLeft: '5px' }} />
					</button>
                </th>
                <th style={{ width: '80px', padding: '12px 0px' }}>
					<button
						type="button"
						onClick={this.sortBynum.bind(this, 'english')}
                    	className="headingButton w-100 text-decoration-none text-white"
					>
						English
						<i className={engCls} style={{ marginLeft: '5px' }} />
					</button>
                </th>
                <th style={{ width: '76px', padding: '12px 0px' }}>
					<button 
						type="button"
						onClick={this.sortBynum.bind(this, 'tamil')}
                    	className="headingButton w-100 text-decoration-none text-white"
					>
						Tamil
						<i className={tamCls} style={{ marginLeft: '5px' }} />
					</button>
                </th>
                <th style={{ width: '83px', padding: '12px 0px' }}>
					<button 
						type="button"
						onClick={this.sortBynum.bind(this, 'maths')}
                    	className="headingButton w-100 text-decoration-none text-white"
					>
						Maths
						<i className={mathCls} style={{ marginLeft: '5px' }} />
					</button>
                </th>
                <th style={{ width: '92px', padding: '12px 0px' }}>
					<button 
						type="button"
						onClick={this.sortBynum.bind(this, 'science')}
                    	className="headingButton w-100 text-decoration-none text-white"
					>
						Science
						<i className={sciCls} style={{ marginLeft: '5px' }} />
					</button>
                </th>
                <th style={{ width: '80px', padding: '12px 0px' }}>
					<button
						type="button"
						onClick={this.sortBynum.bind(this, 'social')}
                    	className="headingButton w-100 text-decoration-none text-white"
					>
						Social
						<i className={socCls} style={{ marginLeft: '5px' }} />
					</button>
                </th>
                <th style={{ width: '76px', padding: '12px 0px' }}>
					<button 
						type="button"
						onClick={this.sortBynum.bind(this, 'total')}
                    	className="headingButton w-100 text-decoration-none text-white"
					>
						Total
						<i className={totalCls} style={{ marginLeft: '5px' }} />
					</button>
                </th>
                <th style={{ width: '73px', padding: '12px 0px' }}>
					<button 
						type="button"
						onClick={this.sortBynum.bind(this, 'rank')}
                    	className="headingButton w-100 text-decoration-none text-white"
					>
						Rank
						<i className={rankCls} style={{ marginLeft: '5px' }} />
					</button>
                </th>
				<th>Photo</th>
				<th>Gender</th>
				<th>Section</th>
				<th>Action</th>
			</tr>
        </thead>
        );
    }    
}

const mapStatetoProps = (state) => ({
        post: state
 });

const mapDispatchtoProps = (dispatch) => ({
        directionValue: (data) => { dispatch({ type: 'SORT_DIRECTION', data }); },
        sort: (data, class1, class2) => {
			dispatch({
 				type: 'SORTING', data, className1: class1, className2: class2 
					}); 
			},
        icon: (data) => { dispatch({ type: 'ICON', data }); },
        allclass: () => { dispatch({ type: 'ALL_CLASS' }); },
        keyItem: (data) => { dispatch({ type: 'KEY', data }); },
		sortOn: (data) => { dispatch({ type: 'SORT_ON', data }); },
		duplicateItem: (data) => { dispatch({ type: 'DUPLICATE_POST', data }); },
		oldDirection: (data) => { dispatch({ type: 'OLD_DIRECTION', data }); }
    });

export default connect(mapStatetoProps, mapDispatchtoProps, null, { forwardRef: true })(Tablehead);
