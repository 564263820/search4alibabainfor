import java.net.URL;

import net.htmlparser.jericho.FormField;
import net.htmlparser.jericho.FormFields;
import net.htmlparser.jericho.Source;

public class FormFieldList {
	public static void main(String[] args) throws Exception {
		String sourceUrlString = "data/form.html";
		if (args.length == 0)
			System.err.println("Using default argument of \"" + sourceUrlString
					+ '"');
		else
			sourceUrlString = args[0];
		if (sourceUrlString.indexOf(':') == -1)
			sourceUrlString = "file:" + sourceUrlString;
		Source source = new Source(new URL(sourceUrlString));
		FormFields formFields = source.getFormFields();
		System.out.println("The document " + sourceUrlString + " contains "
				+ formFields.size() + " form fields:\n");
		for (FormField formField : formFields) {
			System.out.println(formField.getDebugInfo());
		}
	}
}
