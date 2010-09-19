package demo;
import java.util.Iterator;
import java.util.List;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;


import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.FormField;
import net.htmlparser.jericho.Source;

public class DisplayAllElements {
	public static void main(String[] args) throws Exception {
		String sourceUrlString = "data/test.html";
		/*
		 * if (args.length==0) System.err.println("Using default argument of
		 * \""+sourceUrlString+'"'); else sourceUrlString=args[0]; if
		 * (sourceUrlString.indexOf(':')==-1)
		 * sourceUrlString="file:"+sourceUrlString;
		 * MicrosoftTagTypes.register(); PHPTagTypes.register();
		 * PHPTagTypes.PHP_SHORT.deregister(); // remove PHP short tags for this
		 * example otherwise they override processing instructions
		 * MasonTagTypes.register(); Source source=new Source(new
		 * URL(sourceUrlString));
		 */
		Source source = new Source(CompactSource.class.getClassLoader()
				.getResourceAsStream("data/form.html"));
		List<Element> elementList = source.getAllElements("table");
		Iterator<FormField> it = source.getFormFields().iterator();
		while (it.hasNext()) {
			FormField ff = it.next();
			System.out.print(ff.getName() + ":");
			for (String s : ff.getValues()) {
				System.out.print(s + " ");
			}
			System.out.println("");

		}
		// source.getElementById("");
		// source.getAllElements("table")
		for (Element element : elementList) {
			System.out
					.println("-------------------------------------------------------------------------------");
			System.out.println(element.getDebugInfo());
			if (element.getAttributes() != null)
				System.out.println("XHTML StartTag:\n"
						+ element.getStartTag().tidy(true));
			System.out.println("Source text with content:\n" + element);
		}
		ScriptEngineManager sen = new ScriptEngineManager();
		ScriptEngine engine = sen.getEngineByName("javascript");
		Object obj = engine
				.eval("var window={};var document={}; var a=1; var b=2;add(a,b); function add(a,b){return a+b;}; //");
		System.out.println(obj);

		// System.out.println(source.getCacheDebugInfo());
	}
}
