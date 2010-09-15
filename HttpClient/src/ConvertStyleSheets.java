import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.util.List;

import net.htmlparser.jericho.Attribute;
import net.htmlparser.jericho.Attributes;
import net.htmlparser.jericho.HTMLElementName;
import net.htmlparser.jericho.OutputDocument;
import net.htmlparser.jericho.Source;
import net.htmlparser.jericho.StartTag;
import net.htmlparser.jericho.Util;

public class ConvertStyleSheets {
	public static void main(String[] args) throws Exception {
		String sourceUrlString = "data/form.html";
		if (args.length == 0)
			System.err.println("Using default argument of \"" + sourceUrlString
					+ '"');
		else
			sourceUrlString = args[0];
		if (sourceUrlString.indexOf(':') == -1)
			sourceUrlString = "file:" + sourceUrlString;
		URL sourceUrl = new URL(sourceUrlString);
		Source source = new Source(sourceUrl);
		OutputDocument outputDocument = new OutputDocument(source);
		StringBuilder sb = new StringBuilder();
		List<StartTag> linkStartTags = source
				.getAllStartTags(HTMLElementName.LINK);
		for (StartTag startTag : linkStartTags) {
			Attributes attributes = startTag.getAttributes();
			String rel = attributes.getValue("rel");
			if (!"stylesheet".equalsIgnoreCase(rel))
				continue;
			String href = attributes.getValue("href");
			if (href == null)
				continue;
			String styleSheetContent;
			try {
				styleSheetContent = Util.getString(new InputStreamReader(
						new URL(sourceUrl, href).openStream()));
			} catch (Exception ex) {
				System.err.println(ex.toString());
				continue; // don't convert if URL is invalid
			}
			sb.setLength(0);
			sb.append("<style");
			Attribute typeAttribute = attributes.get("type");
			if (typeAttribute != null)
				sb.append(' ').append(typeAttribute);
			sb.append(">\n").append(styleSheetContent).append("\n</style>");
			outputDocument.replace(startTag, sb.toString());
		}
		System.err
				.println("Here is the document "
						+ sourceUrlString
						+ " with all external stylesheets converted to inline stylesheets:\n");
		outputDocument.writeTo(new OutputStreamWriter(System.out));
	}
}
