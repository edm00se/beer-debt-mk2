package com.eric.xsp.servlet;

import java.io.PrintWriter;
import java.util.Arrays;

import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * This is an extension of Jesse Gallagher's AbstractXSPServlet. Its purpose is
 * to return the abstracted DesignerFacesServlet to a more industry normal
 * practice, encompassing doVerb style methods. This provides an enum for all
 * possible HTTP Methods to be used, though it provides an abstract method only
 * for GET, POST, PUT, and DELETE. A RESTful approach assuming only those four
 * methods, mapping equivalently, to their respective CRUD operations.
 * 
 * @author Eric McCormick, @edm00se
 * 
 */
public abstract class AbstractHTTPServlet extends AbstractXSPServlet {
	
	/**
	 * Enum of all available HTTP methods.
	 */
	public enum Methods {
		GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, CONNECT, PATCH
	}
	
	/**
	 * @return contentType String
	 */
	public abstract String getContentType();
	
	/**
	 * @return methodsAllowed String[]
	 */
	public abstract String[] getMethodsAllowed();
	
	/**
	 * Abstract method for GET requests.
	 * 
	 * @param req HttpServletRequest
	 * @param res HttpServletResponse
	 * @param facesContext FacesContext
	 * @param out ServletOutputStream
	 * @throws Exception
	 */
	public abstract void doGet( HttpServletRequest req,
					HttpServletResponse res, FacesContext facesContext,
					PrintWriter out ) throws Exception;
	
	/**
	 * Abstract method for POST requests.
	 * 
	 * @param req HttpServletRequest
	 * @param res HttpServletResponse
	 * @param facesContext FacesContext
	 * @param out ServletOutputStream
	 * @throws Exception
	 */
	public abstract void doPost( HttpServletRequest req,
					HttpServletResponse res, FacesContext facesContext,
					PrintWriter out ) throws Exception;
	
	/**
	 * Abstract method for PUT requests.
	 * 
	 * @param req HttpServletRequest
	 * @param res HttpServletResponse
	 * @param facesContext FacesContext
	 * @param out ServletOutputStream
	 * @throws Exception
	 */
	public abstract void doPut( HttpServletRequest req,
					HttpServletResponse res, FacesContext facesContext,
					PrintWriter out ) throws Exception;
	
	/**
	 * Abstract method for DELETE requests.
	 * 
	 * @param req HttpServletRequest
	 * @param res HttpServletResponse
	 * @param facesContext FacesContext
	 * @param out ServletOutputStream
	 * @throws Exception
	 */
	public abstract void doDelete( HttpServletRequest req,
					HttpServletResponse res, FacesContext facesContext,
					PrintWriter out ) throws Exception;
	
	/**
	 * Abstract method for requests methods that are not
	 * implemented (e.g.- PATCH, TRACE, etc).
	 * 
	 * @param req HttpServletRequest
	 * @param res HttpServletResponse
	 * @param facesContext FacesContext
	 * @param out ServletOutputStream
	 * @throws Exception
	 */
	public void doUnHandled( HttpServletRequest req,
					HttpServletResponse res, FacesContext facesContext,
					PrintWriter out ) throws Exception {
		res.setStatus(405); // Method Not Allowed
		res.setHeader("Access-Control-Allow-Methods", Arrays.toString(this.getMethodsAllowed()));
	}
	
	
	
	/**
	 * Returns 200 OK with the Access-Control-Allow-Methods header
	 * and the Arrays.toString result of the String[] from getMethodsAllowed().
	 * 
	 * @param req HttpServletRequest
	 * @param res HttpServletResponse
	 * @param facesContext FacesContext
	 * @param out ServletOutputStream
	 */
	public void doOptions( HttpServletRequest req,
					HttpServletResponse res, FacesContext facesContext,
					PrintWriter out ) {
		res.setStatus(200); // OK
		res.setHeader("Access-Control-Allow-Methods", Arrays.toString(this.getMethodsAllowed()));
	}
	
	@Override
	public void doService( HttpServletRequest req, HttpServletResponse res, FacesContext facesContext, PrintWriter out )
					throws Exception {

		res.setContentType(this.getContentType());
		res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		Methods reqMethod = Methods.valueOf(req.getMethod());
		
		switch (reqMethod) {
			case GET:
				this.doGet(req, res, facesContext, out);
				break;
			case POST:
				this.doPost(req, res, facesContext, out);
				break;
			case PUT:
				this.doPut(req, res, facesContext, out);
				break;
			case DELETE:
				this.doDelete(req, res, facesContext, out);
				break;
			case OPTIONS:
				this.doOptions(req, res, facesContext, out);
				break;
			default:
				this.doUnHandled(req, res, facesContext, out);
				break;
		}
		
	}
	
}