using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests
{
    public class UserUpdatePWRequest
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", ErrorMessage = "Invalid Password")]
        [StringLength(100, MinimumLength = 8)]
        public string Password { get; set; }

        [StringLength(100, MinimumLength = 8)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

    }
}
