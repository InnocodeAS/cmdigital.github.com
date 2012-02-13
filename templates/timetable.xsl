<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/labs">
    <xsl:apply-templates select="//timetables/schedule"/>
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