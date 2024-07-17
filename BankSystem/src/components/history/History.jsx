import { NavBar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { Spinner } from "../../assets/spinner/Spinner";
import { useState, useEffect } from "react";
import { useUser } from "../../shared/hooks/useUser";
import noDataGif from '../../assets/img/noData.gif';
import coin from '../../assets/img/coins.png';
import './History.css';

export const History = () => {
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const { history } = useUser();

  console.log(history);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filterOptions = ['Transfer', 'Buyed', 'Deposit'];

  const getTableHeaders = () => {
    switch (filterType) {
      case 'transfer':
        return ['ID', 'From', 'To', 'Amount', 'Motion', 'Date'];
      case 'buyed':
        return ['ID', 'Service', 'No. Account', 'Amount', 'Motion', 'Date'];
      case 'deposit':
        return ['ID', 'From', 'To', 'Amount', 'Motion', 'Date'];
      default:
        return ['ID', 'From/Service', 'To/No. Account', 'Amount', 'Motion', 'Date'];
    }
  };

  const getTransactionData = (transfer) => {
    switch (filterType) {
      case 'transfer':
        return [
          transfer._id,
          transfer.rootAccount.accountNumber,
          transfer.recipientAccount.accountNumber,
          transfer.amount,
          transfer.motion,
          transfer.date
        ];
      case 'buyed':
        return [
          transfer._id,
          transfer.services ? transfer.services.name : 'Tipo no definido',
          transfer.rootAccount.accountNumber,
          transfer.amount || 'N/A',
          transfer.motion,
          transfer.date
        ];
      case 'deposit':
        return [
          transfer._id,
          transfer.rootAccount.client.name,
          transfer.recipientAccount.accountNumber,
          transfer.amount,
          transfer.motion,
          transfer.date
        ];
      default:
        return [
          transfer._id,
          transfer.services ? transfer.services.name : (transfer.rootAccount?.client?.name || 'Tipo no definido'),
          transfer.recipientAccount?.accountNumber || transfer.rootAccount?.accountNumber || 'N/A',
          transfer.amount || 'N/A',
          transfer.motion,
          transfer.date
        ];
    }
  };

  const noDataToShow = () => {
    const selectedTransfers = history.transfers.filter(transfer =>
      filterType === '' || transfer.motion.toLowerCase() === filterType
    );
    return selectedTransfers.length === 0;
  };

  if (!history || !history.transfers) {
    return <Spinner />;
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <NavBar />
          <div className="main-container">
            <div className="header-section">
              <h1>Historial de tus transacciones || {history.user.name}</h1>
              <div className="currency-buttons">
                <button>
                  <img className="coinImage" src={coin} alt="flag" />
                </button>
              </div>
            </div>

            <div className="transaction-history">
              <div className="search-container">
                <select className="filter-select" onChange={handleFilterChange} value={filterType}>
                  <option value="">Selecciona el tipo de transaccion</option>
                  {filterOptions.map((option, index) => (
                    <option key={index} value={option.toLowerCase()}>{option}</option>
                  ))}
                </select>
              </div>

              {noDataToShow() && (
                <div className="no-data-container">
                  <img src={noDataGif} alt="No data" />
                  <p>No tienes {filterType ? filterType.charAt(0).toUpperCase() + filterType.slice(1) : ''}</p>
                </div>
              )}

              {!noDataToShow() && (
                <div className="transaction-table-wrapper">
                  <table className="transaction-table">
                    <thead>
                      <tr>
                        {getTableHeaders().map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {history.transfers.map((transfer, index) => (
                        (filterType === '' || transfer.motion.toLowerCase() === filterType) && (
                          <tr key={index}>
                            {getTransactionData(transfer).map((data, dataIndex) => (
                              <td key={dataIndex}>{data}</td>
                            ))}
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};
