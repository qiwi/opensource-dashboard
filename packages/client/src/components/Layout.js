import styled, { injectGlobal } from 'styled-components';
import 'normalize.css';

export const Wrap = styled.main`flex: 1 0 auto;`;

export const Root = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: 800px;
	min-width: 400px;
	
	> * {
		padding: 0 50px;
	} 
`;

injectGlobal`
	html, body, #root{
        height: 100%;
        font-size: 16px;
	}
	body {
        background: #FFF;
        line-height: 20px;
        font-family: Regular;   
	}
	
	a {
		text-decoration: none;
		color: #999
	}
	
	ul {
    
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }
  
  li::before {
    content: "•  ";
    color: #999
  }
`;
