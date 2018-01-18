package action;

import java.util.ArrayList;
import java.util.regex.Pattern;

import dao.ASDao;
import dao.ASSetDao;
import dao.PolicyDao;
import domain.ASSet;
import domain.AutNum;
import domain.PolicyInfo;
import domain.WordObj;
import utils.OperateUtil;
import utils.WordClass;
import utils.WordRegex;

/*
 * 解析过程：
 * 先解析as的基本信息
 * 在解析策略信息
 * 最后解析as-set信息
 * 
 * */
public class YaccAnalysis {
	private ArrayList<WordObj> wordObjs;
	
	public YaccAnalysis(ArrayList<WordObj> objs) {
		this.wordObjs = objs;
	}
	
	public void analysis() {
		if (wordObjs == null || wordObjs.size() == 0) {
			return;
		}
		
		ASSet as_set = null;
		
		
		String key = null;
		
		boolean flag = false; // 用于检测是否存在语法错误
		
		
		// 解析as的基本信息
		AutNum aut_num = null;
		aut_num = new AutNum();
		int i;
		L:
		for (i = 0; i < wordObjs.size(); i++) {
			
			WordObj obj = wordObjs.get(i);
			if (obj.getContent().equals("import") || obj.getContent().equals("export")) {
				break L;
			}
			
			if (obj.getWordClass() == WordClass.KEYWORD) {
				if (key != null) {
					OperateUtil.errorLog("语法错误！");
					flag = true;
					break L;
				}
				
				key = wordObjs.get(i).getContent();
				if (i+1 >= wordObjs.size() || wordObjs.get(i+1).getWordClass() != WordClass.COLON) {
					OperateUtil.errorLog("语法错误！");
					flag = true;
					break L;
				}
			} else if (obj.getWordClass() == WordClass.COLON) {
				continue;
			} else if (obj.getWordClass() == WordClass.VAR) {
				if (key == null) {
					OperateUtil.errorLog("语法错误！");
					flag = true;
					break L;
				}
				
				String value = obj.getContent();
				if (key.equals("mnt-by")) {
					aut_num.setMnt_by(value);
				} else if (key.equals("aut-num")) {
					if (!Pattern.matches(WordRegex.AS_FORMAT, value)) {
						OperateUtil.errorLog("AS命名不规范！");
						return;
					}
					
					aut_num.setAs_num(value);
				} else if (key.equals("as-name")) {
					aut_num.setAs_name(value);
				} else if (key.equals("country")) {
					aut_num.setCountry(value);
				} else if (key.equals("descr")) {
					String descr = value;
					i++;
					while (i < wordObjs.size() && wordObjs.get(i).getWordClass() == WordClass.VAR) {
						descr += " ";
						descr += wordObjs.get(i).getContent();
						i++;
					}
					
					String curDescr = aut_num.getDescr();
					if (curDescr != null && curDescr.length() > 0) {
						curDescr += ",";
						curDescr += descr;
					} else {
						curDescr = descr;
					}
					
					aut_num.setDescr(curDescr);
					
					i--;
				}
				
				key = null;
			}
		}
		
		if (flag) {
			return;
		}
		
		AutNum tmp_an = new ASDao().queryAS(aut_num.getAs_num());
		if (tmp_an == null) {
			new ASDao().addAS(aut_num);
		} else {
			new ASDao().modifyAS(aut_num);
		}
		
		
		PolicyInfo pi = null;
		// 解析策略信息
		for (; i < wordObjs.size(); i++) {
			WordObj obj = wordObjs.get(i);
			if (obj.getContent().equals("as-set") || obj.getContent().equals("members")) {
				break;
			}
			
			pi = new PolicyInfo();
			pi.setAs_num(aut_num.getAs_num());
			pi.setPermit(1);
			pi.setPref(100);
			pi.setMed(0);
			if (obj.getContent().equals("import")) {
				pi.setIs_import(1);
				i++;
				if (i >= wordObjs.size() || !(wordObjs.get(i).getContent().equals(":"))) {
					OperateUtil.errorLog("语法错误！1");
					return;
				}
				
				i++;
				if (i >= wordObjs.size() || !(wordObjs.get(i).getContent().equals("from"))) {
					OperateUtil.errorLog("语法错误！2");
					return;
				}
				
				i++;
				if (i >= wordObjs.size() || !(wordObjs.get(i).getWordClass() == WordClass.VAR)) {
					OperateUtil.errorLog("语法错误！3");
					return;
				} else {
					String value = wordObjs.get(i).getContent();
					pi.setAs_num_d(value);
				}
			    
				i++;
				if (i >= wordObjs.size() || !(wordObjs.get(i).getContent().equals("action"))) {
					OperateUtil.errorLog("语法错误！4");
					return;
				}
				
				i++;
				if (wordObjs.get(i).getContent().equals("pref")) {
					if (i+3 >= wordObjs.size()) {
						OperateUtil.errorLog("语法错误！5");
						return;
					}
					
					if (wordObjs.get(i+1).getContent().equals("=") 
							&& wordObjs.get(i+2).getWordClass() == WordClass.NUMBER
							&& wordObjs.get(i+3).getContent().equals(";")) {
						int pref = Integer.parseInt(wordObjs.get(i+2).getContent());
						pi.setPref(pref);
						
						i = i + 4;
					} else {
						OperateUtil.errorLog("语法错误！6");
						return;
					}
				}
				
				if (wordObjs.get(i).getContent().equals("med")) {
					if (i+3 >= wordObjs.size()) {
						OperateUtil.errorLog("语法错误！7");
						return;
					}
					
					if (wordObjs.get(i+1).getContent().equals("=") 
							&& wordObjs.get(i+2).getWordClass() == WordClass.NUMBER
							&& wordObjs.get(i+3).getContent().equals(";")) {
						int med = Integer.parseInt(wordObjs.get(i+2).getContent());
						pi.setMed(med);
						
						i = i + 4;
					} else {
						OperateUtil.errorLog("语法错误！8");
						return;
					}
				}
				
				if (i >= wordObjs.size() || !(wordObjs.get(i).getContent().equals("accept"))) {
					OperateUtil.errorLog("语法错误！9");
					return;
				}
				
				i++;
				if (i >= wordObjs.size() || !(wordObjs.get(i).getWordClass() == WordClass.VAR)) {
					OperateUtil.errorLog("语法错误！10");
					return;
				} else {
					String value = wordObjs.get(i).getContent();
					pi.setAsregexp(value);
				}
				
				new PolicyDao().addPolicyInfo(pi);
			} else if (obj.getContent().equals("export")) {
				
				pi.setIs_import(0);
				i++;
				if (i >= wordObjs.size() || !(wordObjs.get(i).getContent().equals(":"))) {
					OperateUtil.errorLog("语法错误！11");
					return;
				}
				
				i++;
				if (i >= wordObjs.size() || !(wordObjs.get(i).getContent().equals("to"))) {
					OperateUtil.errorLog("语法错误！12");
					return;
				}
				
				i++;
				if (i >= wordObjs.size() || !(wordObjs.get(i).getWordClass() == WordClass.VAR)) {
					OperateUtil.errorLog("语法错误！13");
					return;
				} else {
					String value = wordObjs.get(i).getContent();
					pi.setAs_num_d(value);
				}
			    
				i++;
				if (i >= wordObjs.size() || !(wordObjs.get(i).getContent().equals("action"))) {
					OperateUtil.errorLog("语法错误！14");
					return;
				}
				
				i++;
				if (wordObjs.get(i).getContent().equals("pref")) {
					if (i+3 >= wordObjs.size()) {
						OperateUtil.errorLog("语法错误！15");
						return;
					}
					
					if (wordObjs.get(i+1).getContent().equals("=") 
							&& wordObjs.get(i+2).getWordClass() == WordClass.NUMBER
							&& wordObjs.get(i+3).getContent().equals(";")) {
						int pref = Integer.parseInt(wordObjs.get(i+2).getContent());
						pi.setPref(pref);
						
						i = i + 4;
					} else {
						OperateUtil.errorLog("语法错误！16");
						return;
					}
				}
				
				if (wordObjs.get(i).getContent().equals("med")) {
					if (i+3 >= wordObjs.size()) {
						OperateUtil.errorLog("语法错误！17");
						return;
					}
					
					if (wordObjs.get(i+1).getContent().equals("=") 
							&& wordObjs.get(i+2).getWordClass() == WordClass.NUMBER
							&& wordObjs.get(i+3).getContent().equals(";")) {
						int med = Integer.parseInt(wordObjs.get(i+2).getContent());
						pi.setMed(med);
						
						i = i + 4;
					} else {
						OperateUtil.errorLog("语法错误！18");
						return;
					}
				}
				
				if (i >= wordObjs.size() || !(wordObjs.get(i).getContent().equals("announce"))) {
					OperateUtil.errorLog("语法错误！19");
					return;
				}
				
				i++;
				if (i >= wordObjs.size() || !(wordObjs.get(i).getWordClass() == WordClass.VAR)) {
					OperateUtil.errorLog("语法错误！20");
					return;
				} else {
					String value = wordObjs.get(i).getContent();
					pi.setAsregexp(value);
				}
				
				new PolicyDao().addPolicyInfo(pi);
				
				
				
			} else {
				OperateUtil.errorLog("语法错误！21");
				return;
			}
		}
		
		// 解析as-set信息
		// i++;
		for (; i < wordObjs.size(); i++) {
			as_set = new ASSet();
			WordObj obj = wordObjs.get(i);
			
			if (!obj.getContent().equals("as-set")) {
				System.out.println(obj.getContent());
				OperateUtil.errorLog("语法错误！22");
				return;
			}
			
			i++;
			if (i >= wordObjs.size() || !wordObjs.get(i).getContent().equals(":")) {
				OperateUtil.errorLog("语法错误！23");
				return;
			}
			
			i++;
			if (i >= wordObjs.size() || wordObjs.get(i).getWordClass() != WordClass.VAR) {
				OperateUtil.errorLog("语法错误！24");
				return;
			} else {
				String value = wordObjs.get(i).getContent();
				
				if (i+2 < wordObjs.size() 
						&& wordObjs.get(i+1).getContent().equals(":")
						&& wordObjs.get(i+2).getWordClass() == WordClass.VAR) {
					value += wordObjs.get(i+1).getContent();
					value += wordObjs.get(i+2).getContent();
					
					if (!Pattern.matches(WordRegex.AS_SET_FORMAT, value)) {
						OperateUtil.errorLog("as-set命名不规范！");
						return;
					}
					
					i = i + 2;
				} else {
					OperateUtil.errorLog("as-set命名不规范！");
					return;
				}
				
				as_set.setAs_set_name(value);
			}
			
			i++;
			if (i >= wordObjs.size() || !wordObjs.get(i).getContent().equals("members")) {
				OperateUtil.errorLog("语法错误！25");
				return;
			}
			
			i++;
			if (i >= wordObjs.size() || !wordObjs.get(i).getContent().equals(":")) {
				OperateUtil.errorLog("语法错误！26");
				return;
			}
			
			
			
			
			
			
			
			i++;
			String members = "";
			String curAS = "";
			if (i+2 < wordObjs.size() 
					&& wordObjs.get(i).getWordClass() == WordClass.VAR
					&& wordObjs.get(i+1).getContent().equals(":")
					&& wordObjs.get(i+2).getWordClass() == WordClass.VAR) {
				curAS += wordObjs.get(i).getContent();
				curAS += wordObjs.get(i+1).getContent();
				curAS += wordObjs.get(i+2).getContent();
				if (!Pattern.matches(WordRegex.AS_SET_FORMAT, curAS)) {
					OperateUtil.errorLog("自治系统命名不规范！");
					return;
				}
				
				i = i + 2;
			} else if (wordObjs.get(i).getWordClass() == WordClass.VAR
					&& Pattern.matches(WordRegex.AS_FORMAT, wordObjs.get(i).getContent())) {
				curAS += wordObjs.get(i).getContent();
			} else {
				OperateUtil.errorLog("语法错误！27");
				return;
			}
			
			members = curAS;
			
			
			
			
			
			curAS = "";
			while (i+1 < wordObjs.size() && wordObjs.get(i+1).getContent().equals(",")) {
				if (i+4 < wordObjs.size() 
						&& wordObjs.get(i+2).getWordClass() == WordClass.VAR
						&& wordObjs.get(i+3).getContent().equals(":")
						&& wordObjs.get(i+4).getWordClass() == WordClass.VAR) {
					curAS += wordObjs.get(i+2).getContent();
					curAS += wordObjs.get(i+3).getContent();
					curAS += wordObjs.get(i+4).getContent();
					if (!Pattern.matches(WordRegex.AS_SET_FORMAT, curAS)) {
						OperateUtil.errorLog("自治系统命名不规范！");
						return;
					}
					
					i = i + 4;
				} else if (i + 2 < wordObjs.size()
						&& wordObjs.get(i+2).getWordClass() == WordClass.VAR
						&& Pattern.matches(WordRegex.AS_FORMAT, wordObjs.get(i+2).getContent())) {
					curAS += wordObjs.get(i+2).getContent();
					i = i + 2;
				} else {
					OperateUtil.errorLog("语法错误！28");
					return;
				}
				
				members += ",";
				members += curAS;
				curAS = "";
				
			}
			as_set.setMembers(members);
			
			new ASSetDao().addASSet(as_set);
		}
		
		
	}
	
	public static void main(String[] args) throws Exception {
		LexAnalysis la = new LexAnalysis("rpsl.txt");
		ArrayList<WordObj> list = la.analysis();
		
		for (WordObj wo : list) {
			System.out.println(wo);
		}
		
		System.out.println(list.size());
		
		YaccAnalysis ya = new YaccAnalysis(list);
		ya.analysis();
	}
}
