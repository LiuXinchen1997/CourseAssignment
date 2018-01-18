package domain;

public class PolicyInfo {
	private int policy_info_id;
	private String as_num;
	private String as_num_d;
	private int is_import;
	private int permit;
	private String asregexp;
	private int pref;
	
	private int comm;
	private int med;
	public int getPolicy_info_id() {
		return policy_info_id;
	}
	public void setPolicy_info_id(int policy_info_id) {
		this.policy_info_id = policy_info_id;
	}
	public String getAs_num() {
		return as_num;
	}
	public void setAs_num(String as_num) {
		this.as_num = as_num;
	}
	public String getAs_num_d() {
		return as_num_d;
	}
	public void setAs_num_d(String as_num_d) {
		this.as_num_d = as_num_d;
	}
	public int getIs_import() {
		return is_import;
	}
	public void setIs_import(int is_import) {
		this.is_import = is_import;
	}
	public int getPermit() {
		return permit;
	}
	public void setPermit(int permit) {
		this.permit = permit;
	}
	public String getAsregexp() {
		return asregexp;
	}
	public void setAsregexp(String asregexp) {
		this.asregexp = asregexp;
	}
	public int getPref() {
		return pref;
	}
	public void setPref(int pref) {
		this.pref = pref;
	}
	public int getComm() {
		return comm;
	}
	public void setComm(int comm) {
		this.comm = comm;
	}
	public int getMed() {
		return med;
	}
	public void setMed(int med) {
		this.med = med;
	}
	public PolicyInfo(int policy_info_id, String as_num, String as_num_d, int is_import, int permit, String asregexp,
			int pref, int comm, int med) {
		super();
		this.policy_info_id = policy_info_id;
		this.as_num = as_num;
		this.as_num_d = as_num_d;
		this.is_import = is_import;
		this.permit = permit;
		this.asregexp = asregexp;
		this.pref = pref;
		this.comm = comm;
		this.med = med;
	}
	public PolicyInfo() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "PolicyInfo [policy_info_id=" + policy_info_id + ", as_num=" + as_num + ", as_num_d=" + as_num_d
				+ ", is_import=" + is_import + ", permit=" + permit + ", asregexp=" + asregexp + ", pref=" + pref
				+ ", comm=" + comm + ", med=" + med + "]";
	}
}
