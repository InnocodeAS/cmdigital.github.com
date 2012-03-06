<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:variable name="page">projects</xsl:variable>

  <xsl:template match="/labs">

    <xsl:if test= "$page = 'projects'">
      <xsl:apply-templates select="//projects/project"/>
    </xsl:if>

    <xsl:if test= "$page = 'calendar'">
      <xsl:apply-templates select="//timetables/schedule" />
    </xsl:if>

  </xsl:template>

  <xsl:template match="project">
    <xsl:param name="id"><xsl:value-of select="@id"/></xsl:param>

    <section>
      <h2><xsl:value-of select="position()"/>. <xsl:value-of select="@name"/></h2>
      <ol>
        <xsl:apply-templates select="//timetables//item[@project=$id]" mode="project"/>
      </ol>
    </section>
  </xsl:template>

  <xsl:template match="item" mode="project">
    <xsl:param name="userId"><xsl:value-of select="@user"/></xsl:param>
      <li>
        <xsl:apply-templates select="//users/user[@id=$userId]" mode="project"/>
        <xsl:value-of select="@name"/>
        [<xsl:value-of select="@time" /> (<xsl:value-of select="../@date" />)]
      </li>
  </xsl:template>
  
  <xsl:template match="user" mode="project">
    <xsl:value-of select="@name"/>
  </xsl:template>


  <xsl:template match="schedule">
      <section>
        <h2><xsl:value-of select="@date"/></h2>
        <ol>
          <xsl:for-each select="item">
            <li>
              <xsl:apply-templates mode="timetables" select="id(@user)"/>
              <xsl:apply-templates mode="timetables" select="id(@project)"/>
              <time><xsl:value-of select="@time"/></time>
            </li>
          </xsl:for-each>
        </ol>
      </section>
  </xsl:template>

  <xsl:template mode="timetables" match="user">
    <xsl:value-of select="@name"/>
  </xsl:template>

  <xsl:template mode="timetables" match="project">
    <span class="project">
      <a href="{@url}">
        <xsl:value-of select="@name"/>
      </a>
      <a href="{@srcURL}">src</a>
    </span>
  </xsl:template>

</xsl:stylesheet>