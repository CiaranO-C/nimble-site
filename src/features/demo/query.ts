const previewQuery = `{
        items {
          count {
            all
          }
        }
        sales {
          count {
            sales
            refunds
            bundles
            byDate {
              all {
                date
                sales
                refunds
                bundles
              }
              items {
                date
                items
                boosted
              }
            }
          }
          revenue {
            total
            net
            byDate {
              all {
                total
                net
                date
                shipping
              }
            }
            average {
              byDate {
                daily {
                  average
                  date
                }
                monthly {
                  average
                  date
                }
              }
              byTime {
                average
                hour
              }
            }
          }
        }
        buyers {
          all {
            buyers
            count
          }
          repeat {
            buyers {
              bought
              buyer
            }
            count
          }
          byCountry {
            country
            buyers
          }
        }
      }`;

export { previewQuery };
