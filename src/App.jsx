import React, { useState, useEffect } from 'react';
// import './App.css';
import colgLogo from '../public/pngwing.com (18).png'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoMdSwap } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaNewspaper } from "react-icons/fa";
const initialColleges = [
  {
    "id": 1,
    "name": "IIT Madras - Indian Institute of Technology",
    "cdRank": 1,
    "courseFee": 20000,
    "placementAmount": 80000,
    "userReviews": 8.0,
    "ranking": 8
  },
  {
    "id": 2,
    "name": "IIT Madras - Indian Institute of Technology B",
    "cdRank": 2,
    "courseFee": 18000,
    "placementAmount": 75000,
    "userReviews": 9.0,
    "ranking": 6
  },
  {
    "id": 3,
    "name": "IIT Madras - Indian Institute of Technology C",
    "cdRank": 3,
    "courseFee": 22000,
    "placementAmount": 85000,
    "userReviews": 5.0,
    "ranking": 7
  },
  {
    "id": 4,
    "name": "IIT Madras - Indian Institute of Technology D",
    "cdRank": 4,
    "courseFee": 19000,
    "placementAmount": 78000,
    "userReviews": 7.0,
    "ranking": 5
  },
  {
    "id": 5,
    "name": "IIT Madras - Indian Institute of Technology E",
    "cdRank": 5,
    "courseFee": 21000,
    "placementAmount": 82000,
    "userReviews": 8.0,
    "ranking": 9
  },
  {
    "id": 6,
    "name": "IIT Madras - Indian Institute of Technology F",
    "cdRank": 6,
    "courseFee": 23000,
    "placementAmount": 88000,
    "userReviews": 7.0,
    "ranking": 11
  },
  {
    "id": 7,
    "name": "College G",
    "cdRank": 7,
    "courseFee": 25000,
    "placementAmount": 90000,
    "userReviews": 9.0,
    "ranking": 12
  },
  {
    "id": 8,
    "name": "College H",
    "cdRank": 8,
    "courseFee": 27000,
    "placementAmount": 95000,
    "userReviews": 6.0,
    "ranking": 14
  },
  {
    "id": 9,
    "name": "College I",
    "cdRank": 9,
    "courseFee": 26000,
    "placementAmount": 93000,
    "userReviews": 8.4,
    "ranking": 13
  },
  {
    "id": 10,
    "name": "College J",
    "cdRank": 10,
    "courseFee": 24000,
    "placementAmount": 89000,
    "userReviews": 6.0,
    "ranking": 10
  },
  {
    "id": 11,
    "name": "College K",
    "cdRank": 11,
    "courseFee": 28000,
    "placementAmount": 97000,
    "userReviews": 8.8,
    "ranking": 15
  },
  {
    "id": 12,
    "name": "College L",
    "cdRank": 12,
    "courseFee": 30000,
    "placementAmount": 100000,
    "userReviews": 6.8,
    "ranking": 16
  },
  {
    "id": 13,
    "name": "aollege M",
    "cdRank": 13,
    "courseFee": 32000,
    "placementAmount": 105000,
    "userReviews": 6.6,
    "ranking": 18
  },
  {
    "id": 14,
    "name": "College N",
    "cdRank": 14,
    "courseFee": 34000,
    "placementAmount": 110000,
    "userReviews": 8.0,
    "ranking": 20
  },
  {
    "id": 15,
    "name": "College O",
    "cdRank": 15,
    "courseFee": 36000,
    "placementAmount": 115000,
    "userReviews": 7.0,
    "ranking": 22
  },
  {
    "id": 16,
    "name": "College P",
    "cdRank": 16,
    "courseFee": 38000,
    "placementAmount": 120000,
    "userReviews": 6.0,
    "ranking": 24
  },
  {
    "id": 17,
    "name": "College Q",
    "cdRank": 17,
    "courseFee": 40000,
    "placementAmount": 125000,
    "userReviews": 8.8,
    "ranking": 26
  },
  {
    "id": 18,
    "name": "College R",
    "cdRank": 18,
    "courseFee": 42000,
    "placementAmount": 130000,
    "userReviews": 6.0,
    "ranking": 28
  },
  {
    "id": 19,
    "name": "College S",
    "cdRank": 19,
    "courseFee": 44000,
    "placementAmount": 135000,
    "userReviews": 8.0,
    "ranking": 30
  },
  {
    "id": 20,
    "name": "College T",
    "cdRank": 20,
    "courseFee": 46000,
    "placementAmount": 140000,
    "userReviews": 9.4,
    "ranking": 32
  }
];

function App() {
	const [colleges, setColleges] = useState(initialColleges);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortConfig, setSortConfig] = useState({ key: null, direction: '' });
	const [hasMore, setHasMore] = useState(true);
	const [items, setItems] = useState(initialColleges.slice(0, 8));
	const pageSize = 8;
  
	const handleSort = (key) => {
	  let direction = 'ascending';
	  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
		direction = 'descending';
	  }
	  setSortConfig({ key, direction });
	};
  
	const sortedColleges = [...colleges].sort((a, b) => {
	  if (sortConfig.direction === 'ascending') {
		return a[sortConfig.key] - b[sortConfig.key];
	  }
	  return b[sortConfig.key] - a[sortConfig.key];
	});
  
	const filteredColleges = sortedColleges.filter((college) =>
	  college.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
  
	const fetchMoreData = () => {
	  if (items.length >= colleges.length) {
		setHasMore(false);
		return;
	  }
	  setTimeout(() => {
		setItems(items.concat(colleges.slice(items.length, items.length + pageSize)));
	  }, 500);
	};
  
	const handleSearch = (e) => {
	  setSearchTerm(e.target.value);
	};
  
	const getSortIcon = (key) => {
	  if (sortConfig.key === key) {
		return sortConfig.direction === 'ascending' ? '▲' : '▼';
	  }
	  return null;
	};
  
	return (
	  <div className="App h-[100vh] p-2 scrollbar-hide overflow-y-auto">
		<div className=' p-2'>
		<input
		  type="text"
		  placeholder="Search by college name"
		  value={searchTerm}
		  onChange={handleSearch}
		  className='outline-none w-[100%] border-[2px] rounded-[10px] p-2'
		/>
		</div>
		<InfiniteScroll
		  dataLength={items.length}
		  next={fetchMoreData}
		  hasMore={hasMore}
		  loader={<h4>Loading...</h4>}
		  endMessage={<p>No more items</p>}
		>
		  <table className='w-[100%] '>
			<thead className='bg-[#78bec3] text-[white] text-[15px] lg:text-[13px] md:text-[12px] sm:text-[10px] h-[50px] w-[100%]'>
			  <tr>
				<th onClick={() => handleSort('cdRank')} className='w-[7%] border-r-[1px]'>CD Rank {getSortIcon('cdRank')}</th>
				<th  className='w-[33%] border-r-[1px]'>Name</th>
				<th onClick={() => handleSort('courseFee')} className='w-[15%] border-r-[1px]'>Course Fee {getSortIcon('courseFee')}</th>
				<th onClick={() => handleSort('placementAmount')} className='w-[15%] border-r-[1px]'>Placement {getSortIcon('placementAmount')}</th>
				<th onClick={() => handleSort('userReviews')} className='w-[15%] border-r-[1px]'>User Reviews {getSortIcon('userReviews')}</th>
				<th onClick={() => handleSort('ranking')} className='w-[15%] border-r-[1px]'>Ranking {getSortIcon('ranking')}</th>
			  </tr>
			</thead>
			<tbody className='w-[100%] font-poppins'>
			  {filteredColleges.map((college) => (
				<tr key={college.id} className='h-[200px] w-[100%] border-b-[1px]'>
				  <td className='w-[7%] min-w-[60px] border-r-[1px] border-l-[1px] p-2 text-[14px] lg:text-[13px] md:text-[12px] sm:text-[10px] font-poppins font-medium'>#{college.cdRank}</td>
				  <td className='w-[33%] min-w-[200px] border-r-[1px] p-2 font-poppins'>
					<div className='flex gap-2 '>
						<img src={colgLogo} alt=""  className='w-[40px] h-[40px] lg:w-[30px] lg:h-[30px] md:h-[20px] md:w-[20px]'/>
						<div className='space-y-2'>
							<h1 className=' font-semibold text-[15px] lg:text-[12px] md:text-[10px] sm:text-[8px] text-[#55c9e6]'>{college.name}</h1>
							<p className='text-[12px] lg:text-[10px] md:text-[8px] sm:text-[7px]'>Chennai,Tamil Nadu | AICTE Approved</p>

							<div className='w-[100%] bg-[#fffae1] p-2 rounded-[0px_40px_40px_0px] border-l-[2px] border-[#ff9b50]'>
								<h4 className='text-[#ff9b50] font-medium text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px]'>B.tech Computer Science</h4>
								<p className=' font-medium text-[13px] lg:text-[11px] md:text-[9px] sm:text-[7px]'>JEE - Advanced 2023 Cutoff:144</p>
							</div>
						</div>
					</div>
					<div className='flex justify-between mt-4 mx-4 lg:mx-2 md:mx-0 text-[13px] lg:text-[10px] md:text-[8px] sm:text-[6px] font-semibold'>
						<button className='text-[#ff9b50] flex  items-center'><IoMdArrowRoundForward />Apply</button>
						<button className='text-[#4d994d] flex  items-center'><IoMdArrowRoundDown />Download Brochure</button>
						<div className=' flex   items-center'><input type="checkbox" name="" id="" className='mr-1' /> Add To Compare</div>

					</div>
					</td>
				  <td className='w-[15%] min-w-[130px] border-r-[1px] p-2 space-y-2'>
					
					<h1 className='font-semibold font-Roboto text-[17px] lg:text-[15px] md:text-[13px] sm:text-[11px] text-[#46c6ab]'>₹ {college.courseFee}</h1>
					<p className='text-[13px] lg:text-[10px] md:text-[9px] sm:text-[8px] font-medium text-[#4d4c4c]'>BE/B.Tech</p>
					<p className='text-[13px] lg:text-[10px] md:text-[9px] sm:text-[8px] font-medium text-[#4d4c4c]'>-1st Year Fees</p>
					<button className='text-[#ff9b50] flex text-[15px] lg:text-[11px] md:text-[9px] sm:text-[9px] font-semibold items-center'> <IoMdSwap />Compare Fees</button>
					</td>
				  <td className='w-[15%] min-w-[130px] border-r-[1px] p-2 space-y-1'>
				  <h1 className='font-semibold font-Roboto text-[17px] lg:text-[15px] md:text-[13px] sm:text-[11px] text-[#46c6ab]'>₹ {college.placementAmount}</h1>
					<p className='text-[13px] lg:text-[10px] md:text-[9px] sm:text-[8px] font-medium text-[#4d4c4c]'>Average Package</p>
					<h1 className='font-semibold font-Roboto text-[17px] lg:text-[15px] md:text-[13px] sm:text-[11px] text-[#46c6ab]'>₹ 200000</h1>
					<p className='text-[13px] lg:text-[10px] md:text-[9px] sm:text-[8px] font-medium text-[#4d4c4c]'>Highest Package</p>
					<button className='text-[#ff9b50] flex text-[15px] lg:text-[10px] md:text-[9px] sm:text-[8px] font-semibold items-center'> <IoMdSwap />Compare Placement</button>
					
				  </td>
				  <td className='w-[15%] min-w-[130px] border-r-[1px] p-2 space-y-2'>
					<h3 className='font-medium text-[18px] lg:text-[15px] md:text-[13px] sm:text-[11px] text-[#4d4c4c] '>{college.userReviews}/10</h3>
					<p className='text-[13px] lg:text-[10px] md:text-[9px] sm:text-[8px] font-medium text-[#4d4c4c] '>Based on 289 User Reviews</p>
					<p className='flex  items-center text-[#da7d7d] text-[12px] lg:text-[10px] md:text-[9px] sm:text-[8px] font-medium rounded-[10px] bg-[#e1de74] p-1 w-[130px] lg:w-[110px] '>
						Best in Social Life <IoIosArrowDown />
					</p>
					</td>
				  <td className='w-[15%] min-w-[130px] border-r-[1px] p-2'>
					<h2 className='font-medium text-[18px] lg:text-[15px] md:text-[13px] sm:text-[11px] text-[#4d4c4c] '>#{college.ranking}/<span className='text-[orange]'>131</span> in India</h2>
				  <div className='flex items-center font-medium text-[18px] lg:text-[15px] md:text-[13px] sm:text-[11px] text-[#4d4c4c]'><FaNewspaper /> 2023</div>
				  <div className='flex items-center text-[#4080ca] gap-1 text-[12px] lg:text-[10px] md:text-[9px] sm:text-[8px] bg-[#87cfeba6] w-[150px] lg:w-[110px]  p-2 rounded-r-[20px] border-l-[2px] border-[#4a87cc]'><FaNewspaper /><FaNewspaper /> +9 More <IoIosArrowDown /> </div>
				  </td>
				</tr>
			  ))}
			</tbody>
		  </table>
		</InfiniteScroll>
	  </div>
	);
  }
  
  export default App;