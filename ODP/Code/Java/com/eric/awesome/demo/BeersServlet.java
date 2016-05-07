package com.eric.awesome.demo;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Vector;

import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lotus.domino.Database;
import lotus.domino.NotesException;
import lotus.domino.View;
import lotus.domino.ViewEntry;
import lotus.domino.ViewNavigator;

import com.eric.xsp.servlet.AbstractHTTPServlet;
import com.google.gson.Gson;
import com.ibm.xsp.extlib.util.ExtLibUtil;

public class BeersServlet extends AbstractHTTPServlet {
	
	@Override
	public String getContentType() {
		return "application/json; charset=utf-8";
	}
	
	@Override
	public String[] getMethodsAllowed() {
		return new String[] { "GET", "POST", "PUT", "DELETE", "OPTIONS" };
	}
	
	@Override
	public void doGet( HttpServletRequest req, HttpServletResponse res,
					FacesContext facesContext, PrintWriter out ) throws IOException {
		
		HashMap<String, Object> resp = new HashMap<String, Object>();
		Database db = ExtLibUtil.getCurrentDatabase();
		View vw;
		try {
			vw = db.getView("debt");
			vw.setAutoUpdate(false);
			ArrayList<HashMap<String, Object>> data = new ArrayList<HashMap<String, Object>>();
			ViewNavigator nav = vw.createViewNav();
			ViewEntry first = nav.getFirstDocument();
			while (first != null) {
				Vector<?> colVals = first.getColumnValues();
				HashMap<String, Object> tmpOb = new HashMap<String, Object>();
				tmpOb.put("who", colVals.get(0));
				tmpOb.put("quantity", colVals.get(1));
				tmpOb.put("reasons", Helpers.getValueAsVector(colVals.get(2)));
				
				data.add(tmpOb);
				
				ViewEntry tmpNxt = nav.getNextDocument();
				first.recycle();
				first = tmpNxt;
			}
			resp.put("data", data);
			resp.put("error", false);
			res.setStatus(200); // OK
		} catch (NotesException e) {
			// log out!
			e.printStackTrace();
			res.setStatus(500);
			resp.put("error", true);
			resp.put("errorMessage", e.toString());
		}
		Gson g = new Gson();
		out.print(g.toJson(resp));
	}
	
	@Override
	public void doPost( HttpServletRequest req, HttpServletResponse res, FacesContext facesContext, PrintWriter out )
	throws Exception {
		
		this.doUnHandled(req, res, facesContext, out);
	}
	
	@Override
	public void doPut( HttpServletRequest req, HttpServletResponse res, FacesContext facesContext, PrintWriter out )
	throws Exception {
		
		this.doUnHandled(req, res, facesContext, out);
	}
	
	@Override
	public void doDelete( HttpServletRequest req, HttpServletResponse res, FacesContext facesContext, PrintWriter out )
	throws Exception {
		
		this.doUnHandled(req, res, facesContext, out);
	}
	
}
