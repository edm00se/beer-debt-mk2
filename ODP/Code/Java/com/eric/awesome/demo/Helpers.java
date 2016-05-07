package com.eric.awesome.demo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

public class Helpers implements Serializable {
	
	private static final long	serialVersionUID	= 1L;
	
	public Helpers() {

	}
	
	/**
	 * Java method version of my getValueAsVector SSJS helper function.
	 * 
	 * Primarily accounts for Vector, any List, or String values as input
	 * object. The newly created Vectors are Vector<Object> as it's generic
	 * enough to work.
	 * 
	 * One day, IBM will upgrade the JVM to >=1.7, which will let us switch off
	 * a String value, letting me achieve the same thing as with the SSJS
	 * implementation.
	 * 
	 * @param obj
	 *            Object to examine.
	 * @return Vector of value(s) from originating Object.
	 */
	public static Vector<?> getValueAsVector( Object obj ) {

		if( obj instanceof java.util.Vector ) {
			return (Vector<?>) obj;
		} else if( obj instanceof ArrayList ) {
			List<?> o = (List<?>) obj;
			Vector<Object> tmpVec = new Vector<Object>();
			for ( int i = 0; i < o.size(); i++ ) {
				tmpVec.add(o.get(i));
			}
			return tmpVec;
		} else {
			Vector<Object> tmpVec = new Vector<Object>();
			tmpVec.add(obj);
			return tmpVec;
		}
	}
	
}
