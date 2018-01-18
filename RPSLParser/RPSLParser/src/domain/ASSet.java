package domain;

public class ASSet {
	private String as_set_name;
	private String members;
	private String mbrs_by_ref;
	public String getAs_set_name() {
		return as_set_name;
	}
	public void setAs_set_name(String as_set_name) {
		this.as_set_name = as_set_name;
	}
	public String getMembers() {
		return members;
	}
	public void setMembers(String members) {
		this.members = members;
	}
	public String getMbrs_by_ref() {
		return mbrs_by_ref;
	}
	public void setMbrs_by_ref(String mbrs_by_ref) {
		this.mbrs_by_ref = mbrs_by_ref;
	}
	public ASSet(String as_set_name, String members, String mbrs_by_ref) {
		super();
		this.as_set_name = as_set_name;
		this.members = members;
		this.mbrs_by_ref = mbrs_by_ref;
	}
	public ASSet() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "ASSet [as_set_name=" + as_set_name + ", members=" + members + ", mbrs_by_ref=" + mbrs_by_ref + "]";
	}
}
