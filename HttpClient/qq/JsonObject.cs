using System;
using System.Collections.Generic;
using System.Text;

namespace Lonely.Child.Tools
{
    /// <summary>
    /// ���ڹ�������ֵ�Ļص�
    /// </summary>
    /// <param name="Property"></param>
    public delegate void SetProperties(JsonObject Property);

    /// <summary>
    /// JsonObject����ֵ����
    /// </summary>
    public enum JsonPropertyType
    {
        String,
        Object,
        Array,
        Number,
        Bool,
        Null
    }

    /// <summary>
    /// JSONͨ�ö���
    /// </summary>
    public class JsonObject
    {
        private Dictionary<String, JsonProperty> _property;

        public JsonObject()
        {
            this._property = null;
        }

        public JsonObject(String jsonString)
        {
            this.Parse(ref jsonString);
        }

        public JsonObject(SetProperties callback)
        {
            if (callback != null)
            {
                callback(this);
            }
        }

        /// <summary>
        /// Json�ַ�������
        /// </summary>
        /// <param name="jsonString"></param>
        private void Parse(ref String jsonString)
        {
            int len = jsonString.Length;
            if (String.IsNullOrEmpty(jsonString) || jsonString.Substring(0, 1) != "{" || jsonString.Substring(jsonString.Length - 1, 1) != "}")
            {
                throw new ArgumentException("�����ı�������Json��ʽ!" + jsonString);
            }
            Stack<Char> stack = new Stack<char>();
            Stack<Char> stackType = new Stack<char>();
            StringBuilder sb = new StringBuilder();
            Char cur;
            bool convert = false;
            bool isValue = false;
            JsonProperty last = null;
            for (int i = 1; i <= len - 2; i++)
            {
                cur = jsonString[i];
                if (cur == '}')
                {
                    ;
                }
                if (cur == ' ' && stack.Count == 0)
                {
                    ;
                }
                else if ((cur == '\'' || cur == '\"') && !convert && stack.Count == 0 && !isValue)
                {
                    sb.Length = 0;
                    //��ջ
                    stack.Push(cur);
                }
                else if ((cur == '\'' || cur == '\"') && !convert && stack.Count > 0 && stack.Peek() == cur && !isValue)
                {
                    //��ջ
                    stack.Pop();
                }
                else if ((cur == '[' || cur == '{') && stack.Count == 0)
                {
                    stackType.Push(cur == '[' ? ']' : '}');
                    sb.Append(cur);
                }
  //              else if ((cur == ']' || cur == '}') && stack.Count == 0 && stackType.Peek() == cur)
                else if ((cur == ']' || cur == '}'))
                {
                    if (stack.Count == 0)
                    {
                        if (stackType.Count > 0)
                        {
                            if (stackType.Peek() == cur)
                            {
                                stackType.Pop();
                                sb.Append(cur);
                            }
                        }
                    }
                }
                else if (cur == ':' && stack.Count == 0 && stackType.Count == 0 && !isValue)
                {
                    last = new JsonProperty();
                    this[sb.ToString()] = last;
                    isValue = true;
                    sb.Length = 0;
                }
                else if (cur == ',' && stack.Count == 0 && stackType.Count == 0)
                {
                    if (last != null)
                    {

                        String temp = sb.ToString();
                        last.Parse(ref temp);
                    }
                    isValue = false;
                    sb.Length = 0;
                }
                else
                {
                    sb.Append(cur);
                }
            }
            if (sb.Length > 0 && last != null && last.Type == JsonPropertyType.Null)
            {
                String temp = sb.ToString();
                last.Parse(ref temp);
            }
        }

        /// <summary>
        /// ��ȡ����
        /// </summary>
        /// <param name="PropertyName"></param>
        /// <returns></returns>
        public JsonProperty this[String PropertyName]
        {
            get
            {
                JsonProperty result = null;
                if (this._property != null && this._property.ContainsKey(PropertyName))
                {
                    result = this._property[PropertyName];
                }
                return result;
            }
            set
            {
                if (this._property == null)
                {
                    this._property = new Dictionary<string, JsonProperty>(StringComparer.OrdinalIgnoreCase);
                }
                if (this._property.ContainsKey(PropertyName))
                {
                    this._property[PropertyName] = value;
                }
                else
                {
                    this._property.Add(PropertyName, value);
                }
            }
        }

        /// <summary>
        /// ͨ���˷��ͺ�����ֱ�ӻ�ȡָ���������Ե�ֵ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="PropertyName"></param>
        /// <returns></returns>
        public virtual T Properties<T>(String PropertyName) where T : class
        {
            JsonProperty p = this[PropertyName];
            if (p != null)
            {
                return p.GetValue<T>();
            }
            return default(T);
        }

        /// <summary>
        /// ��ȡ���������б�
        /// </summary>
        /// <returns></returns>
        public String[] GetPropertyNames()
        {
            if (this._property == null)
                return null;
            String[] keys = null;
            if (this._property.Count > 0)
            {
                keys = new String[this._property.Count];
                this._property.Keys.CopyTo(keys, 0);
            }
            return keys;
        }

        /// <summary>
        /// �Ƴ�һ������
        /// </summary>
        /// <param name="PropertyName"></param>
        /// <returns></returns>
        public JsonProperty RemoveProperty(String PropertyName)
        {
            if (this._property != null && this._property.ContainsKey(PropertyName))
            {
                JsonProperty p = this._property[PropertyName];
                this._property.Remove(PropertyName);
                return p;
            }
            return null;
        }

        /// <summary>
        /// �Ƿ�Ϊ�ն���
        /// </summary>
        /// <returns></returns>
        public bool IsNull()
        {
            return this._property == null;
        }

        public override string ToString()
        {
            return this.ToString("");
        }

        /// <summary>
        /// ToString...
        /// </summary>
        /// <param name="format">��ʽ���ַ���</param>
        /// <returns></returns>
        public virtual string ToString(String format)
        {
            if (this.IsNull())
            {
                return "{}";
            }
            else
            {
                StringBuilder sb = new StringBuilder();
                foreach (String key in this._property.Keys)
                {
                    sb.Append(",");
                    sb.Append(key).Append(": ");
                    sb.Append(this._property[key].ToString(format));

                }
                if (this._property.Count > 0)
                {
                    sb.Remove(0, 1);
                }
                sb.Insert(0, "{");
                sb.Append("}");
                return sb.ToString();
            }
        }
    }

    /// <summary>
    /// JSON��������
    /// </summary>
    public class JsonProperty
    {
        private JsonPropertyType _type;
        private String _value;
        private JsonObject _object;
        private List<JsonProperty> _list;
        private bool _bool;
        private double _number;

        public JsonProperty()
        {
            this._type = JsonPropertyType.Null;
            this._value = null;
            this._object = null;
            this._list = null;
        }

        public JsonProperty(Object value)
        {
            this.SetValue(value);
        }


        public JsonProperty(String jsonString)
        {
            this.Parse(ref jsonString);
        }


        /// <summary>
        /// Json�ַ�������
        /// </summary>
        /// <param name="jsonString"></param>
        public void Parse(ref String jsonString)
        {
            if (String.IsNullOrEmpty(jsonString))
            {
                this.SetValue(null);
            }
            else
            {
                string first = jsonString.Substring(0, 1);
                string last = jsonString.Substring(jsonString.Length - 1, 1);
                if (first == "[" && last == "]")
                {
                    this.SetValue(this.ParseArray(ref jsonString));
                }
                else if (first == "{" && last == "}")
                {
                    this.SetValue(this.ParseObject(ref jsonString));
                }
                else if ((first == "'" || first == "\"") && first == last)
                {
                    this.SetValue(this.ParseString(ref jsonString));
                }
                else if (jsonString == "true" || jsonString == "false")
                {
                    this.SetValue(jsonString == "true" ? true : false);
                }
                else if (jsonString == "null")
                {
                    this.SetValue(null);
                }
                else
                {
                    double d = 0;
                    if (double.TryParse(jsonString, out d))
                    {
                        this.SetValue(d);
                    }
                    else
                    {
                        this.SetValue(jsonString);
                    }
                }
            }
        }

        /// <summary>
        /// Json Array����
        /// </summary>
        /// <param name="jsonString"></param>
        /// <returns></returns>
        private List<JsonProperty> ParseArray(ref String jsonString)
        {
            List<JsonProperty> list = new List<JsonProperty>();
            int len = jsonString.Length;
            StringBuilder sb = new StringBuilder();
            Stack<Char> stack = new Stack<char>();
            Stack<Char> stackType = new Stack<Char>();
            bool conver = false;
            Char cur;
            for (int i = 1; i <= len - 2; i++)
            {
                cur = jsonString[i];
                if (Char.IsWhiteSpace(cur) && stack.Count == 0)
                {
                    ;
                }
                else if ((cur == '\'' && stack.Count == 0 && !conver && stackType.Count == 0) || (cur == '\"' && stack.Count == 0 && !conver && stackType.Count == 0))
                {
                    sb.Length = 0;
                    sb.Append(cur);
                    stack.Push(cur);
                }
                else if (cur == '\\' && stack.Count > 0 && !conver)
                {
                    sb.Append(cur);
                    conver = true;
                }
                else if (conver == true)
                {
                    conver = false;

                    if (cur == 'u')
                    {
                        sb.Append(new char[] { cur, jsonString[i + 1], jsonString[i + 2], jsonString[i + 3] });
                        i += 4;
                    }
                    else
                    {
                        sb.Append(cur);
                    }
                }
                else if ((cur == '\'' || cur == '\"') && !conver && stack.Count > 0 && stack.Peek() == cur && stackType.Count == 0)
                {
                    sb.Append(cur);
                    list.Add(new JsonProperty(sb.ToString()));
                    stack.Pop();
                }
                else if ((cur == '[' || cur == '{') && stack.Count == 0)
                {
                    if (stackType.Count == 0)
                    {
                        sb.Length = 0;
                    }
                    sb.Append(cur);
                    stackType.Push((cur == '[' ? ']' : '}'));
                }
                else if ((cur == ']' || cur == '}') && stack.Count == 0 && stackType.Count > 0 && stackType.Peek() == cur)
                {
                    sb.Append(cur);
                    stackType.Pop();
                    if (stackType.Count == 0)
                    {
                        list.Add(new JsonProperty(sb.ToString()));
                        sb.Length = 0;
                    }

                }
                else if (cur == ',' && stack.Count == 0 && stackType.Count == 0)
                {
                    if (sb.Length > 0)
                    {
                        list.Add(new JsonProperty(sb.ToString()));
                        sb.Length = 0;
                    }
                }
                else
                {
                    sb.Append(cur);
                }
            }
            if (stack.Count > 0 || stackType.Count > 0)
            {
                list.Clear();
                throw new ArgumentException("�޷�����Json Array����!");
            }
            else if (sb.Length > 0)
            {
                list.Add(new JsonProperty(sb.ToString()));
            }
            return list;
        }


        /// <summary>
        /// Json String����
        /// </summary>
        /// <param name="jsonString"></param>
        /// <returns></returns>
        private String ParseString(ref String jsonString)
        {
            int len = jsonString.Length;
            StringBuilder sb = new StringBuilder();
            bool conver = false;
            Char cur;
            for (int i = 1; i <= len - 2; i++)
            {
                cur = jsonString[i];
                if (cur == '\\' && !conver)
                {
                    conver = true;
                }
                else if (conver == true)
                {
                    conver = false;
                    if (cur == '\\' || cur == '\"' || cur == '\'' || cur == '/')
                    {
                        sb.Append(cur);
                    }
                    else
                    {
                        if (cur == 'u')
                        {
                            String temp = new String(new char[] { cur, jsonString[i + 1], jsonString[i + 2], jsonString[i + 3] });
                            //sb.Append((char)Convert.ToInt32(temp, 16));


                            byte[] bytes = new byte[] { (byte)HexToInt(temp.Substring(0, 2)), (byte)HexToInt(temp.Substring(2,2)) };
                            sb.Append(Encoding.Unicode.GetString(bytes));

                            i += 4;
                        }
                        else
                        {
                            switch (cur)
                            {
                                case 'b':
                                    sb.Append('\b');
                                    break;
                                case 'f':
                                    sb.Append('\f');
                                    break;
                                case 'n':
                                    sb.Append('\n');
                                    break;
                                case 'r':
                                    sb.Append('\r');
                                    break;
                                case 't':
                                    sb.Append('\t');
                                    break;
                            }
                        }
                    }
                }
                else
                {
                    sb.Append(cur);
                }
            }
            return sb.ToString();
        }


        private int HexToInt(string h)
        {
            return Convert.ToInt32(h, 0x10);
        }



        /// <summary>
        /// Json Object����
        /// </summary>
        /// <param name="jsonString"></param>
        /// <returns></returns>
        private JsonObject ParseObject(ref String jsonString)
        {
            return new JsonObject(jsonString);
        }

        /// <summary>
        /// ����һ������������������Ƿ�����ģ����ر���
        /// </summary>
        /// <param name="index"></param>
        /// <returns></returns>
        public JsonProperty this[int index]
        {
            get
            {
                JsonProperty r = null;
                if (this._type == JsonPropertyType.Array)
                {
                    if (this._list != null && (this._list.Count - 1) >= index)
                    {
                        r = this._list[index];
                    }
                }
                else if (index == 0)
                {
                    return this;
                }
                return r;
            }
        }

        /// <summary>
        /// �ṩһ���ַ����������򻯶�Object���Եķ���
        /// </summary>
        /// <param name="PropertyName"></param>
        /// <returns></returns>
        public JsonProperty this[String PropertyName]
        {
            get
            {
                if (this._type == JsonPropertyType.Object)
                {
                    return this._object[PropertyName];
                }
                else
                {
                    return null;
                }
            }
            set
            {
                if (this._type == JsonPropertyType.Object)
                {
                    this._object[PropertyName] = value;
                }
                else
                {
                    throw new NotSupportedException("Json���Բ��Ƕ�������!");
                }
            }
        }

        /// <summary>
        /// JsonObjectֵ
        /// </summary>
        public JsonObject Object
        {
            get
            {
                if (this._type == JsonPropertyType.Object)
                    return this._object;
                return null;
            }
        }

        /// <summary>
        /// �ַ���ֵ
        /// </summary>
        public String Value
        {
            get
            {
                if (this._type == JsonPropertyType.String)
                {
                    return this._value;
                }
                else if (this._type == JsonPropertyType.Number)
                {
                    return this._number.ToString();
                }
                return null;
            }
        }

        public JsonProperty Add(Object value)
        {
            if (this._type != JsonPropertyType.Null && this._type != JsonPropertyType.Array)
            {
                throw new NotSupportedException("Json���Բ���Array���ͣ��޷����Ԫ��!");
            }
            if (this._list == null)
            {
                this._list = new List<JsonProperty>();
            }
            JsonProperty jp = new JsonProperty(value);
            this._list.Add(jp);
            this._type = JsonPropertyType.Array;
            return jp;
        }

        /// <summary>
        /// Arrayֵ����������Ƿ�����ģ����װ��ֻ��һ��Ԫ�ص�����
        /// </summary>
        public List<JsonProperty> Items
        {
            get
            {
                if (this._type == JsonPropertyType.Array)
                {
                    return this._list;
                }
                else
                {
                    List<JsonProperty> list = new List<JsonProperty>();
                    list.Add(this);
                    return list;
                }
            }
        }

        /// <summary>
        /// ��ֵ
        /// </summary>
        public double Number
        {
            get
            {
                if (this._type == JsonPropertyType.Number)
                {
                    return this._number;
                }
                else
                {
                    return double.NaN;
                }
            }
        }

        public void Clear()
        {
            this._type = JsonPropertyType.Null;
            this._value = String.Empty;
            this._object = null;
            if (this._list != null)
            {
                this._list.Clear();
                this._list = null;
            }
        }

        public Object GetValue()
        {
            if (this._type == JsonPropertyType.String)
            {
                return this._value;
            }
            else if (this._type == JsonPropertyType.Object)
            {
                return this._object;
            }
            else if (this._type == JsonPropertyType.Array)
            {
                return this._list;
            }
            else if (this._type == JsonPropertyType.Bool)
            {
                return this._bool;
            }
            else if (this._type == JsonPropertyType.Number)
            {
                return this._number;
            }
            else
            {
                return null;
            }
        }

        public virtual T GetValue<T>() where T : class
        {
            return (GetValue() as T);
        }

        public virtual void SetValue(Object value)
        {
            if (value is String)
            {
                this._type = JsonPropertyType.String;
                this._value = (String)value;
            }
            else if (value is List<JsonProperty>)
            {
                this._list = ((List<JsonProperty>)value);
                this._type = JsonPropertyType.Array;
            }
            else if (value is JsonObject)
            {
                this._object = (JsonObject)value;
                this._type = JsonPropertyType.Object;
            }
            else if (value is bool)
            {
                this._bool = (bool)value;
                this._type = JsonPropertyType.Bool;
            }
            else if (value == null)
            {
                this._type = JsonPropertyType.Null;
            }
            else
            {
                double d = 0;
                if (double.TryParse(value.ToString(), out d))
                {
                    this._number = d;
                    this._type = JsonPropertyType.Number;
                }
                else
                {
                    throw new ArgumentException("����Ĳ�������!");
                }
            }
        }

        public virtual int Count
        {
            get
            {
                int c = 0;
                if (this._type == JsonPropertyType.Array)
                {
                    if (this._list != null)
                    {
                        c = this._list.Count;
                    }
                }
                else
                {
                    c = 1;
                }
                return c;
            }
        }

        public JsonPropertyType Type
        {
            get { return this._type; }
        }

        public override string ToString()
        {
            return this.ToString("");
        }


        public virtual string ToString(String format)
        {
            StringBuilder sb = new StringBuilder();
            if (this._type == JsonPropertyType.String)
            {
                sb.Append("'").Append(this._value).Append("'");
                return sb.ToString();
            }
            else if (this._type == JsonPropertyType.Bool)
            {
                return this._bool ? "true" : "false";
            }
            else if (this._type == JsonPropertyType.Number)
            {
                return this._number.ToString();
            }
            else if (this._type == JsonPropertyType.Null)
            {
                return "null";
            }
            else if (this._type == JsonPropertyType.Object)
            {
                return this._object.ToString();
            }
            else
            {
                if (this._list == null || this._list.Count == 0)
                {
                    sb.Append("[]");
                }
                else
                {
                    sb.Append("[");
                    if (this._list.Count > 0)
                    {
                        foreach (JsonProperty p in this._list)
                        {
                            sb.Append(p.ToString());
                            sb.Append(", ");
                        }
                        sb.Length -= 2;
                    }
                    sb.Append("]");
                }
                return sb.ToString();
            }
        }
    }

}
