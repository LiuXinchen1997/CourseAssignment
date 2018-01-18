package domain;

public class AutNum {
	private String as_num;
	private String as_name;
	private String mnt_by;
	private String descr;
	private String country;
	private String memeber_of;
	public String getMnt_by() {
		return mnt_by;
	}
	public void setMnt_by(String mnt_by) {
		this.mnt_by = mnt_by;
	}
	public String getAs_num() {
		return as_num;
	}
	public void setAs_num(String as_num) {
		this.as_num = as_num;
	}
	public String getAs_name() {
		return as_name;
	}
	public void setAs_name(String as_name) {
		this.as_name = as_name;
	}
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getMemeber_of() {
		return memeber_of;
	}
	public void setMemeber_of(String memeber_of) {
		this.memeber_of = memeber_of;
	}
	
	public AutNum(String as_num, String as_name, String mnt_by, String descr, String country, String memeber_of) {
		super();
		this.as_num = as_num;
		this.as_name = as_name;
		this.mnt_by = mnt_by;
		this.descr = descr;
		this.country = country;
		this.memeber_of = memeber_of;
	}
	public AutNum() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "AutNum [mnt_by=" + mnt_by + ", as_num=" + as_num + ", as_name=" + as_name + ", descr=" + descr
				+ ", country=" + country + ", memeber_of=" + memeber_of + "]";
	}
}
