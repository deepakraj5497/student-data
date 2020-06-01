import React from 'react';
import { connect } from 'react-redux';
import { PaginationItem, PaginationLink } from 'reactstrap';

class PaginationValues extends React.Component {
    current = (i) => {
        const {
                currentPage
           } = this.props;
        currentPage(parseInt(i, 10));
    }

	render() {
		let pagecount = '';
        let activeclass;
        const {
            post: {
                post, pageSize, currentPage
               } 
           } = this.props;
        pagecount = Math.ceil(post.length / pageSize);
		const number = [];
		for (let i = 1; i <= pagecount; i += 1) {
            if (currentPage === i) {
				activeclass = 'page-item active';
			} else if (currentPage !== i) {
				activeclass = 'page-item';
			}
            number.push(<PaginationItem className={activeclass} key={i}>
                            <PaginationLink id={i} className="page-link" onClick={(e) => (this.current(e.target.id))}> 
                                {i}
                            </PaginationLink>
                        </PaginationItem>);
		}
		return number;
	}
}

const mapStatetoProps = (state) => ({
        post: state
    });


const mapDispatchtoProps = (dispatch) => ({
        currentPage: (data) => { dispatch({ type: 'CURRENT_PAGE', data }); }
    
});

export default connect(mapStatetoProps, mapDispatchtoProps)(PaginationValues);
