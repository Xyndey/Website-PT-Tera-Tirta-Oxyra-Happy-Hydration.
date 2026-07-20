import React, { useEffect, useState } from 'react';
import api from '../../api/client.js';
import useReveal from '../../hooks/useReveal.js';

export default function LabReport() {
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    api
      .getLabReport()
      .then((data) => {
        if (!active) return;
        setReport(data);
        setStatus('ready');
      })
      .catch(() => active && setStatus('error'));
    return () => {
      active = false;
    };
  }, []);

  useReveal([report]);

  return (
    <section id="bukti" className="sec">
      <div className="floating-droplet" style={{ left: '18%', top: '30%', animationDelay: '1.1s' }} />
      <div className="inner">
        <div className="rv">
          <span className="sec-chip">06</span>
          <span className="sec-kicker">Kualitas Teruji</span>
          <h2 className="sec-title">
            Bukti, bukan <em>janji.</em>
          </h2>
          <div className="sec-bar" />
        </div>

        {status === 'loading' && <p className="section-loading">Memuat laporan uji lab…</p>}
        {status === 'error' && (
          <p className="section-error">Gagal memuat laporan. Silakan segarkan halaman.</p>
        )}

        {status === 'ready' && report && (
          <>
            <div className="receipt rv">
              <div className="receipt-header">
                <b>OXYRA</b>
                <br />
                <span className="receipt-subtitle">Laporan Uji Laboratorium</span>
              </div>
              <div className="meta-row">
                <span>Batch</span>
                <span>{report.batch}</span>
              </div>
              <div className="meta-row">
                <span>Tanggal Uji</span>
                <span>{report.testDate}</span>
              </div>
              <div className="meta-row">
                <span>Laboratorium</span>
                <span>{report.laboratory}</span>
              </div>
              <table>
                <tbody>
                  {report.metrics.map((metric) => (
                    <tr key={metric.label}>
                      <td>{metric.label}</td>
                      <td className={metric.highlight ? 'neg' : undefined}>{metric.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="meta-row">
                <span>BPOM</span>
                <span>{report.bpom}</span>
              </div>
              <div className="meta-row">
                <span>Halal BPJPH</span>
                <span>{report.halalBpjph}</span>
              </div>
              <div className="foot-note">{report.footNote}</div>
              {report.isIllustrative && <div className="stamp-mark">ILUSTRASI</div>}
            </div>
            <p className="disclaimer-note">{report.disclaimer}</p>
          </>
        )}
      </div>
    </section>
  );
}
