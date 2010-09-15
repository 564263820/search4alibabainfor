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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wjdeng.client.util.SysStaticKey;

public class ValidateFilter implements Filter {

	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		Object obj = req.getSession().getAttribute(SysStaticKey.UserKey);
		System.out.println();
		if (null != obj || "/login.jsp".equals(req.getRequestURI())) {
			filterChain.doFilter(request, response);
		} else {
			res.sendRedirect("/login.jsp");
		}
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
	}

}
