/******************************************************************************** 
 * Create Author   : JoveDeng
 * Create Date     : Apr 22, 2010
 * File Name       : CodeFilter.java
 *
 ********************************************************************************/
package com.wjdeng.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class CodeFilter implements Filter {

	private String charset;
	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		request.setCharacterEncoding(charset);
		filterChain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		  this.charset=config.getInitParameter("charset");
	}

}
