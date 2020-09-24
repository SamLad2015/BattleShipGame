using System.Linq;
using System.Linq.Dynamic.Core;
using DemontfordTest.Enums;
using Microsoft.EntityFrameworkCore.Internal;

namespace DemontfordTest.Entities
{
    public class Board
    {
        public BoardCellStatus[,] BoardCellStatuses { get; set; }
        public int Rows { get; set; }
        public int Columns { get; set; }
        public int OccupationCount { get; set; }
        public int HitCount { get; set; }
    }
}