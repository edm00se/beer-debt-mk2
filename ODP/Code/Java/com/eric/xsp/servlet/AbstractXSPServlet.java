package com.eric.xsp.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.faces.context.FacesContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.xsp.webapp.DesignerFacesServlet;

/**
 * A modified version of Jesse Gallagher's AbstractXSPServlet, primarily changed
 * to make use of a PrintWriter in place of ServletOutputStream.
 * 
 * @author Eric McCormick
 * 
 */
public abstract class AbstractXSPServlet extends DesignerFacesServlet {
	
	@Override
	public void service( final ServletRequest servletRequest, final ServletResponse servletResponse )
					throws ServletException, IOException {

		HttpServletResponse res = (HttpServletResponse) servletResponse;
		HttpServletRequest req = (HttpServletRequest) servletRequest;
		
		res.setContentType("text/plain");
		res.setCharacterEncoding("UTF-8");
		res.setHeader("Cache-Control", "no-cache");
		
		PrintWriter out = res.getWriter();
		FacesContext facesContext = this.getFacesContext(req, res);
		
		try {
			doService(req, res, facesContext, out);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			facesContext.responseComplete();
			facesContext.release();
			out.close();
		}
	}
	
	protected abstract void doService( final HttpServletRequest req, final HttpServletResponse res,
					final FacesContext facesContext, final PrintWriter out ) throws Exception;
}